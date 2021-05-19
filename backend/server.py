from flask import Flask, request
from flask_cors import CORS
import numpy as np
import cv2
import base64

def convert_to_binary(data):
    if isinstance(data, str):
        return ''.join([ format(ord(i), "08b") for i in data ])
    elif isinstance(data, bytes) or isinstance(data, np.ndarray):
        return [format(i, "08b") for i in data[:3]]
    elif isinstance(data, int) or isinstance(data, np.uint8):
        return format(data, "08b")
    else:
        return {"status": False, "data": "Data type is not supported."}

def encode_image(image_path, secret_data, secret_key):
    filestr = image_path.read()
    npimg = np.fromstring(filestr, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)

    # Calculating maximum byte to encode image.
    # Image has RGB values that they are Red, Green and Blue.
    # Also to calculate total byte count, bytes should be divided to 8 (8-bit binary).
    try:
        byte_count = image.shape[0] * image.shape[1] * 3 // 8
    except AttributeError:
        return {"status": False, "data": "Image is not valid."}

    print("*** Maximum bytes to encode:", byte_count, " ***")

    # To understand where secret data finished, stopping flag added.
    # Secret key adding to secret data.
    secret_data += secret_key

    if len(secret_data) > byte_count:
        return {"status": False, "data": "Insufficient bytes, Data to be added should have less size, or image should have more size"}
       
    print("*** Encoding data...")
    
    secret_data_index = 0
    binary_secret_data = convert_to_binary(secret_data)
    data_len = len(binary_secret_data)

    # The idea of these for loops is accessing each pixel of image
    # For each pixel, code accesses each RGB values which are red, green and blue
    # And adds 1 bit secret data per RGB pixel arrays.
    for row in image:
        for pixel in row:
            color_index = 0
            red, green, blue = convert_to_binary(pixel)
            
            # While secret data index is lesser than length of data
            # Each RGB values go through same process.
            # To understand pixel indexes, 0 = red, 1 = green and 2 = blue.
            # Each value become equal the color + secret data bit.
            # Main logic is that red array values is like 11111111(1 byte), binary_secret_data value is just a bit (like 1)
            # To add secret data, the last bit of red array is be ignoring. Then secret data bit adds to this empty bit field.
            # 1111111(red[:-1]) <- 1 (secret data bit) = 11111111(1 byte)
            for color in [red, green, blue]:
                if secret_data_index >= data_len:
                    break

                pixel[color_index] = int(color[:-1] + binary_secret_data[secret_data_index], 2)
                secret_data_index += 1
                color_index += 1

    image_extension = f'.{image_path.content_type.split("/")[-1]}'
    output_image = base64.b64encode(cv2.imencode(image_extension, image)[1]).decode()

    return {"status": True, "data": output_image}

def decode_image(image_path, secret_key):
    print("*** Decoding image...")

    filestr = image_path.read()
    npimg = np.fromstring(filestr, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)

    binary_secret_data = ""

    # These for loops appends secret bits from the last value of red, green and blue values.
    for row in image:
        for pixel in row:
            red, green, blue = convert_to_binary(pixel)
            binary_secret_data += red[-1]
            binary_secret_data += green[-1]
            binary_secret_data += blue[-1]

    # Splitting all bytes to 8 bit binary form. (like 11111111 11111111 11111111)
    all_bytes = [binary_secret_data[i: i + 8] for i in range(0, len(binary_secret_data), 8)]

    decoded_data = ""

    for byte in all_bytes:
        decoded_data += chr(int(byte, 2))

        if decoded_data[-len(secret_key):] == secret_key:
            return {"status": True, "data": decoded_data[:-len(secret_key)]}
            
    return {"status": False, "data": "Secret key wrong!"}

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

@app.route("/encode", methods=['POST'])
def encode():
	file = request.files['file']
	secretKey = request.form['secretKey']
	secretMessage = request.form['secretMessage']

	requestObj = encode_image(file, secretMessage, secretKey)
	response = { "status": requestObj['status'], 'data': requestObj['data'] }

	return response

@app.route("/decode", methods=['POST'])
def decode():
	file = request.files['file']
	secretKey = request.form['secretKey']

	requestObj = decode_image(file, secretKey)
	response = { "status": requestObj['status'], 'data': requestObj['data'] }

	return response

@app.route("/are-you-alive", methods=['GET'])
def are_you_alive():
	return 'Yes, we are alive'

if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True, port=5000)