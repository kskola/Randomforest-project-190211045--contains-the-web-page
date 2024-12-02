from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import numpy as np
import traceback

app = Flask(__name__)
CORS(app)

# Load the Random Forest model
with open('rfmodel.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('prediction.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        form = request.get_json()
        print("Received data:", form)  # Print received data
        
        features = [
            (form['sex']),
            float(form['age']),
            (form['hypertension']),
            (form['heart']),
            (form['married']),
            (form['work']),
            (form['residence']),
            float(form['glucose']),
            float(form['bmi']),
            (form['smoking'])
        ]
        
        feature_array = np.array([features])
        
        prediction = model.predict(feature_array)
        prediction_proba = model.predict_proba(feature_array)[:, 1]
        
        response = {
            'prediction': int(prediction[0]),
            'probability': float(prediction_proba[0])
        }
        return jsonify(response)
    
    except Exception as e:
        print("Error:", str(e))
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)