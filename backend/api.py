from flask import Flask, request
from flask_cors import CORS

# It handles importing problem to import our local directory
import sys
sys.path.insert(1, 'backend')

from steganography import encode_image, decode_image

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