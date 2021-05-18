from flask import Flask, request
from flask_cors import CORS
import steganography

app = Flask(__name__)
CORS(app)

@app.route("/encode", methods=['POST'])
def encode():
	file = request.files['file']
	secretKey = request.form['secretKey']
	secretMessage = request.form['secretMessage']

	requestObj = steganography.encode_image(file, secretMessage, secretKey)
	response = { "status": requestObj['status'], 'data': requestObj['data'] }

	return response

@app.route("/decode", methods=['POST'])
def decode():
	file = request.files['file']
	secretKey = request.form['secretKey']

	requestObj = steganography.decode_image(file, secretKey)
	response = { "status": requestObj['status'], 'data': requestObj['data'] }

	return response
