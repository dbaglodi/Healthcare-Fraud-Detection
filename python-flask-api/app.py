import json
from flask import Flask, request, jsonify
import pickle

with open('./fraud_detection_model', 'rb') as model_file:
    model = pickle.load(model_file)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    input_data = request.json['input']
    
    # Process input and make prediction
    prediction = model.predict([input_data])

    # Return the prediction as JSON
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
