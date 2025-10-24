from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, origins="*") # Allow all origins for development

@app.route("/routes", methods=["POST"])
def demo():
    data = request.get_json()
    print(f"Received data: {data} and type of username is {type(data["username"])}")
    return jsonify({"message": "Noted!"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)