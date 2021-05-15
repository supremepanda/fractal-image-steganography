from flask import Flask, request
from flask_cors import CORS

import sys
sys.path.insert(1, 'backend')

import steganography

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def hello():
	file = request.files['image']
	image = steganography.encode_image(file, 'ahmet', 'mehmet')['data']
	response = { "type": image }

	return response
