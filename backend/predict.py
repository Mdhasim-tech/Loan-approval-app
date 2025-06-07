from flask import Blueprint, request, jsonify
import joblib
import pandas as pd

pred_bp = Blueprint('pred_bp', __name__)

# Load the model and scaler
model = joblib.load('loan_approval_model.pkl')
scaler = joblib.load('scaler.pkl')

@pred_bp.route('/', methods=['POST'])
def predict():
    data = request.get_json()

    # Wrap the single input into a list to make it a DataFrame row
    df_input = pd.DataFrame([data])  # data is a dict of input features

    # Scale input
    scaled_input = scaler.transform(df_input)

    # Predict
    prediction = model.predict(scaled_input)

    return jsonify({'loan_approval': bool(prediction[0])})
