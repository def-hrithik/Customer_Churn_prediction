from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
scaler = joblib.load(SCALER_PATH)


app = Flask(__name__)

# Load Keras model
MODEL_PATH = 'model.h5'
model = tf.keras.models.load_model(MODEL_PATH)

# Define expected features (total 26)
all_features = [
    'gender', 
    'SeniorCitizen', 
    'Partner', 
    'Dependents', 
    'tenure',
    'PhoneService', 
    'MultipleLines', 
    'OnlineSecurity', 
    'OnlineBackup',
    'DeviceProtection', 
    'TechSupport', 
    'StreamingTV', 
    'StreamingMovies',
    'PaperlessBilling', 
    'MonthlyCharges', 
    'TotalCharges',
    'InternetService_DSL', 
    'InternetService_Fiber optic', 
    'InternetService_No',
    'Contract_Month-to-month', 
    'Contract_One year', 
    'Contract_Two year',
    'PaymentMethod_Bank transfer (automatic)',
    'PaymentMethod_Credit card (automatic)',
    'PaymentMethod_Electronic check', 
    'PaymentMethod_Mailed check'
]



# Top 5 important features from PFI
input_features = [
    'MonthlyCharges', 'Contract_Two year', 'Contract_One year',
    'tenure', 'PaymentMethod_Credit card (automatic)'
]

# Fallback defaults (example static fillers)
default_values = {
    'gender': 0.0,
    'SeniorCitizen': 0.0,
    'Partner': 0.0,
    'Dependents': 0.0,
    'tenure': 0.282,
    'PhoneService': 1.0,
    'MultipleLines': 0.0,
    'OnlineSecurity': 0.0,
    'OnlineBackup': 0.0,
    'DeviceProtection': 0.0,
    'TechSupport': 0.0,
    'StreamingTV': 0.0,
    'StreamingMovies': 0.0,
    'PaperlessBilling': 1.0,
    'MonthlyCharges': 0.560,
    'TotalCharges': 0.131,
    'InternetService_DSL': 0.0,
    'InternetService_Fiber optic': 1.0,
    'InternetService_No': 0.0,
    'Contract_Month-to-month': 1.0,
    'Contract_One year': 0.0,
    'Contract_Two year': 0.0,
    'PaymentMethod_Bank transfer (automatic)': 0.0,
    'PaymentMethod_Credit card (automatic)': 0.0,
    'PaymentMethod_Electronic check': 0.0,
    'PaymentMethod_Mailed check': 0.0
}

contract_map = {
    'Month-to-month': 'Contract_Month-to-month',
    'One year': 'Contract_One year',
    'Two year': 'Contract_Two year'
}

payment_map = {
    'Bank transfer (automatic)': 'PaymentMethod_Bank transfer (automatic)',
    'Credit card (automatic)': 'PaymentMethod_Credit card (automatic)',
    'Electronic check': 'PaymentMethod_Electronic check',
    'Mailed check': 'PaymentMethod_Mailed check'
}

def preprocess_input(data):
    # Start with defaults
    features = default_values.copy()

    # Numeric fields should be converted safely
    features['tenure'] = float(data.get('tenure', 0))
    features['MonthlyCharges'] = float(data.get('monthlyCharges', 0))

    # Reset contract one-hot to 0 and set the selected one to 1
    for key in ['Contract_Month-to-month', 'Contract_One year', 'Contract_Two year']:
        features[key] = 0
    contract_value = data.get('contract')
    if contract_value and contract_value in contract_map:
        features[contract_map[contract_value]] = 1

    # Reset payment method one-hot to 0 and set the selected one to 1
    for key in ['PaymentMethod_Bank transfer (automatic)', 'PaymentMethod_Credit card (automatic)',
                'PaymentMethod_Electronic check', 'PaymentMethod_Mailed check']:
        features[key] = 0
    payment_value = data.get('paymentMethod')
    if payment_value and payment_value in payment_map:
        features[payment_map[payment_value]] = 1

    # Implement other categorical fields if needed here

    return features


@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Preprocess the raw input data (including categorical encoding)
    full_input = preprocess_input(data)

    # Preserve original order of features expected by model
    features_vector = [full_input[f] for f in all_features]
    feature_vector_np = np.array([features_vector])  # shape (1, num_features)
    
    # Scale inputs
    features_vector_scaled = scaler.transform(feature_vector_np)

    # Pass directly (no extra wrapping needed)
    prediction = model.predict(features_vector_scaled)[0][0]
    print("Input features:", features_vector)
    print("Model prediction:", prediction)

    print(f'Length of feature vector: {len(features_vector)}')
    print(f'Feature vector keys: {list(full_input.keys())}')


    result = round(float(prediction) * 100, 2)
    print(result)
    return jsonify({
    "churnProbability": result,           # your actual model prediction
    "riskLevel": "High" if prediction > 0.7 else "Medium" if prediction > 0.4 else "Low",
    "confidence": 80.0,                             # you can set a default or compute from model metrics
    "factors": [
        {"name": "Tenure", "impact": 65, "value": full_input['tenure']},
        {"name": "MonthlyCharges", "impact": 25, "value": full_input['MonthlyCharges']}
        # add more factors/ranking logic as needed
        ]
    })



if __name__ == '__main__':
    app.run(debug=True)