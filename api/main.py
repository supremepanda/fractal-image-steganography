from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/main')
def main():
  return { 'message': 'Hello from api' }