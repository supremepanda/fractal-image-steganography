# Understanding the Theory of Backend Side

Steganography is the art and science of storing information by embedding the message.
It comes from the Greek word «steganos».
It can also be defined as hiding data inside an object.

Steganography is divided into two as Linguistics Steganography and Technical Steganography. Technical steganography can be collected under headings such as microdots and computer-based methods. Computer-based methods are methods of hiding data using text, sound, image, image, video files.

The work we have done in this project is to embed text content in a picture and prevent the picture from changing visibly while doing this.
We can say that the work done is bit-deep, since the picture content does not change noticeably.

# Basic Concepts

'Binary' = is a 2 number system. It is expressed using 0 and 1.
`Bit` = Bits have only two possible values: 0 and 1. Therefore, a binary number consists of 0 and 1 only.
`Byte` = is a unit of measure consisting of 1 or 0 values along an 8-bit sequence.

# Image Basics

Embedding text in the picture and while doing this prevents the picture from changing noticeably, called RGB
We calculate with the numerical values of the colors "red", "green", "blue".

There are thousands or millions of pixels in 1 picture. For example, a 300x500 image content consists of 300 horizontally and 500 units vertically, in total 150000 pixels.

Each pixel has red, green and blue values in itself. These values are usually between ** 0-255 **. For instance, a pixel:

    red: 255
    green: 2
    blue: 100

# String Basics

Another important type is "string". String is not a primitive type in structure and consists of `char`s, which are a primitive type.

`1 char = 1 byte`

# Stenography Method

Basically 3 different functions are used in the project. These are 

- Convert To Binary
- Encode the image with secret data
- Decode the image

# Converting To Binary

It converts the given data to an 8-bit binary. In this way, since the "char" in the text and the "RGB" values in the picture are in the same format, they can be processed together.

For Example: `supremepanda` = **01110011 01110101 01110000 01110010 01100101 01101101 01100101 01110000 01100001 01101110 01100100 01100001**

`222` = **11011110**

Binary Convert Method:

    def  convert_to_binary(data):
        if  isinstance(data, str):
    	    return  ''.join([ format(ord(i), "08b") for i in data ])
        elif  isinstance(data, bytes) or  isinstance(data, np.ndarray):
    	    return [ format(i, "08b") for i in data ]
        elif  isinstance(data, int) or  isinstance(data, np.uint8):
    		return  format(data, "08b")
    	else:
    		raise  TypeError("Type not supported.")

# Encode the Image with Secret Data

There are basically two important conditions for the encoding process on the picture. These are:

- Not spoiling the picture content
- To be able to record data properly

It is necessary to put a sign that it is finished in our data to be stored. The reason for this is that while doing the decode process, we will not be able to understand where the data will end if there is no "secret_key". Next, a comparison should be made between the size of the image and the size of the data to be embedded. The reason for this is that if the text we embed is larger than the image, it is not possible to hide the text.

    image = cv2.imread(image_path)
    try:
        byte_count = image.shape[0] * image.shape[1] * 3 // 8
    except AttributeError:
        return {"status": False, "data": "Image is not valid."}

    secret_data += secret_key

    if len(secret_data) > byte_count:
        return {"status": False, "data": "Insufficient bytes, Data to be added should have less size, or image should have more size"}

After that, the action starts with the conversion of 'secret_data' to binary format.

	binary_secret_data = convert_to_binary(secret_data)

After the Secret data is converted to binary format, we now need to write the data to be hidden in the picture. For this purpose, we should think of each pixel in a picture as lined up in rows, and we should know that each pixel also has RGB value.

The basic and most important logic in data hiding is to not distort the data visibly and to pixel the data within a certain rule.

The method used is; applied to each of the "red", "green" and "blue" values in turn.

For example: let our red value be 255 as decimal. 8-bit binary equivalent of 255 ** 11111111 **. The first bit of the data we want to hide is ** 0 **. Our new `red` value will be 1111111 ** 0 **. This process continues until the data we store is exhausted.

secret_data_index = 0
data_len = len(binary_secret_data)
for row in image:
for pixel in row:
color_index = 0
red, green, blue = convert_to_binary(pixel)
for color in [red, green, blue]:
if secret_data_index >= data_len:
break

                pixel[color_index] = int(color[:-1] + binary_secret_data[secret_data_index], 2)
                secret_data_index += 1
                color_index += 1

# Decode the Image

With the decoding process, we can reveal the content of the text that we have hidden in our picture. In order to decode, it is necessary to know how it is encoded. In our encode application, we used the way of hiding data to the last bit of RGB values in pixels. At the end, we showed that it was done by using 'secret_key'. At this stage, what will be done is to set up a simple search algorithm according to this rule.

First of all, we collect all the bits of the picture in our hands, since we are looking for our secret data in the last bits.

    for  row  in  image:
        for  pixel  in  row:
    	    red, green, blue = convert_to_binary(pixel)
    		    binary_secret_data += red[-1]
    		    binary_secret_data += green[-1]
    		    binary_secret_data += blue[-1]

Then we need to split the binary data into 8-bit format. This is because every  byte which has 8-bit, split will be one character, and those characters will be part of our hidden data.

    all_bytes = [ binary_secret_data[i: i+8] for  i  in  range(0, len(binary_secret_data), 8) ]
    decoded_data = ""
    for  byte  in  all_bytes:
    	decoded_data += chr(int(byte, 2))
    	if  decoded_data[-len(secret_key):] == secret_key:
    		break
    return  decoded_data[:-len(secret_key)]

 