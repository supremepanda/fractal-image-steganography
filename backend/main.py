import numpy as np
import cv2

def convert_to_binary(data):
    
    if isinstance(data, str):
        return ''.join([ format(ord(i), "08b") for i in data ])

    elif isinstance(data, bytes) or isinstance(data, np.ndarray):
        return [ format(i, "08b") for i in data ]

    elif isinstance(data, int) or isinstance(data, np.uint8):
        return format(data, "08b")
    
    else:
        return {"status": False, "data": "Data type is not supported."}

# It encodes image with given secret data and secret key.
def encode_image(output_image, image_path, secret_data, secret_key):

    # Reading the image using cv2 module.
    image = cv2.imread(image_path)

    # Calculating maximum byte to encode image.
    # Image has RGB values that they are Red, Green and Blue.
    # Also to calculate total byte count, bytes should be divided to 8 (8-bit binary).
    try:
        byte_count = image.shape[0] * image.shape[1] * 3 // 8
    except AttributeError:
        return {"status": False, "data": "Image is not valid."}

    # Printing maximum byte count to encode.
    print("*** Maximum bytes to encode:", byte_count, " ***")

    # To understand where secret data finished, stopping flag added.
    # Secret key adding to secret data.
    secret_data += secret_key

    # Raising ValueError exception if our data to be added size greater than image data size.
    if len(secret_data) > byte_count:
        return {"status": False, "data": "Insufficient bytes, Data to be added should have less size, or image should have more size"}
       
    print("*** Encoding data...")
    
    # Secret data index to travel in our data.
    secret_data_index = 0

    # Converting our secret data to binary.
    binary_secret_data = convert_to_binary(secret_data)

    # Size of binary secret data.
    data_len = len(binary_secret_data)

    # The idea of these for loops is accessing each pixel of image
    # For each pixel, code accesses each RGB values which are red, green and blue
    # And adds 1 bit secret data per RGB pixel arrays.
    for row in image:
        for pixel in row:
            
            color_index = 0

            # Converting and splitting pixels to binary as RGB values.
            red, green, blue = convert_to_binary(pixel)
            
            # While secret data index is lesser than lenght of data
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

    # Saving image
    cv2.imwrite(output_image, image)

    # Returning image
    return {"status": True, "data": output_image}

# It decodes image to show secret data using secret key.
def decode_image(image_path, secret_key):

    print("*** Decoding image...")

    # Reading image using python-cv2 module
    image = cv2.imread(image_path)

    # Creating empty binary secret data variable.
    binary_secret_data = ""

    # These for loops appends secret bits from the last value of red, green and blue values.
    for row in image:
        for pixel in row:
            red, green, blue = convert_to_binary(pixel)
            binary_secret_data += red[-1]
            binary_secret_data += green[-1]
            binary_secret_data += blue[-1]

    # Splitting all bytes to 8 bit binary form. (like 11111111 11111111 11111111)
    all_bytes = [ binary_secret_data[i: i+8] for i in range(0, len(binary_secret_data), 8) ]

    # Converting all bytes to their equal chars.
    decoded_data = ""

    for byte in all_bytes:

        # Converting integers based on 2 to character.
        decoded_data += chr(int(byte, 2))

        # Checking secret key to understand where the secret data finished.
        if decoded_data[-len(secret_key):] == secret_key:

            # Returning secret decoded data.
            return {"status": True, "data": decoded_data[:-len(secret_key)]}
            
    return {"status": False, "data": "Secret key wrong!"}

# Creating output encoded image.
#print(encode_image(output_image = "output_image_name.png" ,image_path = "resim.png", secret_data = "to_hide_data", secret_key = "secret_key_to_encrypt"))

# Printing decoded secret data
#print(decode_image(image_path = "output_image_name.png", secret_key = "secret_key_to_encrypt"))