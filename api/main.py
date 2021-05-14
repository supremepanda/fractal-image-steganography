from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/main", methods=['POST'])
def main():
	file = request.files['image']
	response = { "type": "test" }

	return response