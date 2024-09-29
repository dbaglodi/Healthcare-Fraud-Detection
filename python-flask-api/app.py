import json
from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import numpy as np


with open('./fraud_detection_model', 'rb') as model_file:
    model = pickle.load(model_file)


app = Flask(__name__)

CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    global input_data
    input_data = request.json['input']
    print(input_data)
    print(type(input_data))
    global data_dict
    data_dict = input_data

    print(data_dict)

    # global data_dict
    # data_dict = json.loads(input_data)

    model_input = preprocess()

    print(model_input)
    
    # Process input and make prediction
    prediction = model.predict(model_input)
    prediction_list = prediction.tolist()


    # Return the prediction as JSON
    return jsonify({'prediction': prediction_list})

def preprocess():
    # Step 2: Extract the values and convert them to a list or NumPy array
    # You can define the exact order of your features here, corresponding to your model's feature expectations
    model_input = np.array([
        data_dict["CLM_PMT_AMT"],
        data_dict["NCH_PRMRY_PYR_CLM_PD_AMT"],
        data_dict["AT_PHYSN_NPI"],
        data_dict["OP_PHYSN_NPI"],
        data_dict["OT_PHYSN_NPI"],
        data_dict["CLM_PASS_THRU_PER_DIEM_AMT"],
        data_dict["NCH_BENE_IP_DDCTBL_AMT"],
        data_dict["NCH_BENE_PTA_COINSRNC_LBLTY_AM"],
        data_dict["NCH_BENE_BLOOD_DDCTBL_LBLTY_AM"],
        data_dict["CLM_UTLZTN_DAY_CNT"],
        data_dict["PRVDR_NUM_HASH"],
        data_dict["NUM_OCCURENCES"]
    ])

    # Reshape the data to match the model's expected input shape (1 sample, n_features)
    model_input = model_input.reshape(1, -1)
    return model_input

if __name__ == '__main__':
    app.run(debug=True)
