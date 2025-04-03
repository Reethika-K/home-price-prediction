from flask import Flask, request, jsonify
from flask_cors import CORS
import util
app = Flask(__name__)
CORS(app)

@app.route('/get_loc_names', methods=['GET'])
def get_loc_names():
    response = jsonify({
        'locations' : util.get_loc_names()
    })
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    if request.method == 'GET':
        return jsonify({"message": "Use POST to send data"}), 405  # Method Not Allowed

    data = request.get_json()  # Get JSON data from request body
    if not data:
        return jsonify({"error": "Invalid request. No JSON data received"}), 400
    
    try:
        total_sqft = float(data['total_sqft'])
        location = data['location']
        bhk = int(data['bhk'])
        bath = int(data['bath'])

        estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
        response = jsonify({'estimated_price': estimated_price})
        return response
    except (KeyError, ValueError) as e:
        return jsonify({"error": f"Invalid input data: {str(e)}"}), 400


if __name__ == "__main__":
    print("Starting python flask server for Home price prediction")
    util.load_saved_artifacts();
    app.run(debug=True)