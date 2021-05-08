import numpy as np

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
    
    # Exception for not supported type.
    else:
        raise TypeError("Type not supported.")
