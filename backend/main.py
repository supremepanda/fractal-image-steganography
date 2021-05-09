import numpy as np
import cv2

# It converts data to 8-bit binary according to data type.
def convert_to_binary(data):
    
    # If type of data is string
    if isinstance(data, str):
        return ''.join([ format(ord(i), "08b") for i in data ])

    # If type of data is byte
    elif isinstance(data, bytes) or isinstance(data, np.ndarray):
        return [ format(i, "08b") for i in data ]

    # If type of data is integer
    elif isinstance(data, int) or isinstance(data, np.uint8):
        return format(data, "08b")
    
    # Exception TypeError for not supported type.
    else:
        raise TypeError("Type not supported.")

def encode_image(image_path, secret_data):

    # Reading the image using cv2 module.
    image = cv2.imread(image_path)

    # Calculating maximum byte to encode image.
    # Image has RGB values that they are Red, Green and Blue.
    # Also to calculate total byte count, bytes should be divided to 8 (8-bit binary).
    byte_count = image.shape[0] * image.shape[1] * 3 // 8

    # Printing maximum byte count to encode.
    print("*** Maximum bytes to encode:", byte_count, " ***")

    # Raising ValueError exception if our data to be added size greater than image data size.
    if len(secret_data) > byte_count:
        raise ValueError("!!! Insufficient bytes, Data to be added should have less size, or image should have more size")
       
    print("*** Encoding data...")

    # To understand where secret data finished, stopping flag added.
    secret_data += "!!!!!"

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

            # Converting and splitting pixels to binary as RGB values.
            red, green, blue = convert_to_binary(pixel)


            # While secret data index is lesser than lenght of data
            # Each RGB values go through same process.
            # To understand pixel indexes, 0 = red, 1 = green and 2 = blue.
            # Each value become equal the color + secret data bit.
            # Main logic is that red array values is like 11111111(1 byte), binary_secret_data value is just a bit (like 1)
            # To add secret data, the last bit of red array is be ignoring. Then secret data bit adds to this empty bit field.
            # 1111111(red[:-1]) <- 1 (secret data bit) = 11111111(1 byte)
            if secret_data_index < data_len:

                # Adding secret data to red.
                pixel[0] = int(red[:-1] + binary_secret_data[secret_data_index], 2)
                secret_data_index += 1

            if secret_data_index < data_len:

                # Adding secret data to green.
                pixel[1] = int(green[:-1] + binary_secret_data[secret_data_index], 2)
                secret_data_index += 1

            if secret_data_index < data_len:

                # Adding secret data to blue.
                pixel[2] = int(blue[:-1] + binary_secret_data[secret_data_index], 2)
                secret_data_index += 1

            # if data is encoded, breaking the loop.
            if secret_data_index >= data_len:
                break
    
    # Returning encoded image.
    return image

encode_image("image.jpg", "furkan")