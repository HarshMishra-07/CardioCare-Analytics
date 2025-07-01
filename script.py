from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import pickle
import joblib
import os
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Define model path
MODEL_PATH = 'random_forest_model.pkl'

# Load the model with validation
try:
    with open(MODEL_PATH, 'rb') as file:
        model = pickle.load(file)
        logger.info("Model loaded successfully with pickle")
except:
    try:
        model = joblib.load(MODEL_PATH)
        logger.info("Model loaded successfully with joblib")
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        model = None

# Define features in strict order
features = ['BMI', 'Smoking', 'AlcoholDrinking', 'Stroke',
           'PhysicalHealth', 'MentalHealth', 'DiffWalking', 'Sex', 'AgeCategory',
           'Race', 'Diabetic', 'PhysicalActivity', 'GenHealth', 'SleepTime']

def get_health_recommendations(user_data, prediction):
    """Generate hardcoded health recommendations based on user data and prediction"""
    
    recommendations = []
    
    # Priority Actions
    recommendations.append("🚨 Priority Actions:")
    if prediction == 1:
        recommendations.extend([
            "• Schedule a comprehensive cardiac evaluation within 30 days",
            "• Begin daily blood pressure monitoring",
            "• Keep track of any cardiovascular symptoms",
            "• Prepare a list of questions for your healthcare provider"
        ])
    else:
        recommendations.extend([
            "• Maintain your current health practices",
            "• Schedule routine check-ups",
            "• Continue monitoring vital signs",
            "• Stay proactive about prevention"
        ])

    # Lifestyle Recommendations
    recommendations.append("\n💪 Physical Activity:")
    if user_data['PhysicalActivity'] == 1:
        recommendations.extend([
            "• Continue your regular exercise routine",
            "• Aim for 150 minutes of moderate activity weekly",
            "• Include both cardio and strength training",
            "• Take rest days as needed"
        ])
    else:
        recommendations.extend([
            "• Start with 10-minute daily walks",
            "• Gradually increase activity duration",
            "• Consider low-impact exercises",
            "• Join a guided exercise program"
        ])

    # Nutrition Guidelines
    recommendations.append("\n🍎 Nutrition Guidelines:")
    bmi = float(user_data['BMI'])
    if bmi > 24.9:
        recommendations.extend([
            "• Create a balanced calorie deficit",
            "• Increase protein intake",
            "• Choose whole grains over refined carbs",
            "• Monitor portion sizes"
        ])
    elif bmi < 18.5:
        recommendations.extend([
            "• Increase caloric intake healthily",
            "• Focus on nutrient-dense foods",
            "• Add healthy fats to meals",
            "• Consider protein supplementation"
        ])
    else:
        recommendations.extend([
            "• Maintain balanced nutrition",
            "• Eat plenty of fruits and vegetables",
            "• Choose lean proteins",
            "• Stay well hydrated"
        ])

    # Sleep Recommendations
    recommendations.append("\n😴 Sleep Habits:")
    sleep_hours = float(user_data['SleepTime'])
    if sleep_hours < 7:
        recommendations.extend([
            "• Aim for 7-9 hours of sleep",
            "• Establish a regular sleep schedule",
            "• Create a relaxing bedtime routine",
            "• Limit screen time before bed"
        ])
    elif sleep_hours > 9:
        recommendations.extend([
            "• Maintain consistent wake times",
            "• Evaluate sleep quality",
            "• Consider sleep assessment",
            "• Get morning sunlight exposure"
        ])
    else:
        recommendations.extend([
            "• Keep your healthy sleep schedule",
            "• Maintain good sleep hygiene",
            "• Monitor sleep patterns",
            "• Create an optimal sleep environment"
        ])

    # Additional recommendations based on health factors
    if user_data['Smoking'] == 1:
        recommendations.append("\n🚭 Smoking Cessation:")
        recommendations.extend([
            "• Consider nicotine replacement therapy",
            "• Join smoking cessation programs",
            "• Set a quit date",
            "• Seek support from family and friends"
        ])

    if user_data['AlcoholDrinking'] == 1:
        recommendations.append("\n🍷 Alcohol Moderation:")
        recommendations.extend([
            "• Limit alcohol consumption",
            "• Track your drinks",
            "• Stay hydrated while drinking",
            "• Consider alcohol-free alternatives"
        ])

    if user_data['Diabetic'] == 1:
        recommendations.append("\n🩺 Diabetes Management:")
        recommendations.extend([
            "• Monitor blood sugar regularly",
            "• Follow your medication schedule",
            "• Keep diabetes-friendly snacks handy",
            "• Schedule regular foot checks"
        ])

    return "\n".join(recommendations)

def predict_heart_disease(user_inputs):
    """Make prediction using the loaded model with validation and logging"""
    try:
        if model is None:
            raise Exception("Model not loaded")
        
        # Validate all features are present
        missing_features = [f for f in features if f not in user_inputs]
        if missing_features:
            raise Exception(f"Missing features: {missing_features}")
            
        # Convert and validate all inputs
        processed_inputs = {}
        for feature in features:
            try:
                processed_inputs[feature] = float(user_inputs[feature])
            except ValueError:
                raise Exception(f"Invalid value for {feature}: {user_inputs[feature]}")
        
        # Create feature array in correct order
        input_array = np.array([[processed_inputs[feature] for feature in features]])
        logger.info(f"Input array shape: {input_array.shape}")
        logger.info(f"Feature values: {input_array.tolist()}")
        
        # Make prediction with probability
        probabilities = model.predict_proba(input_array)[0]
        low_risk_prob = probabilities[0]
        high_risk_prob = probabilities[1]
        
        logger.info(f"Low risk probability: {low_risk_prob}")
        logger.info(f"High risk probability: {high_risk_prob}")
        
        # If low_risk probability is less than 0.6 (60%), set to high risk
        predicted_class = 0 if low_risk_prob > 0.6 else 1
        
        prediction_result = {
            'prediction': int(predicted_class),
            'confidence': float(max(probabilities)),
            'probabilities': {
                'low_risk': float(low_risk_prob),
                'high_risk': float(high_risk_prob)
            }
        }
        
        logger.info(f"Final prediction result: {prediction_result}")
        return prediction_result
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        logger.info(f"Received prediction request with data: {input_data}")
        
        if not input_data:
            logger.error("No input data provided")
            return jsonify({'error': 'No input data provided'}), 400
        
        prediction_result = predict_heart_disease(input_data)
        
        if prediction_result is not None:
            recommendations = get_health_recommendations(input_data, prediction_result['prediction'])
            
            response = {
                'prediction': prediction_result['prediction'],
                'confidence': prediction_result['confidence'],
                'probabilities': prediction_result['probabilities'],
                'recommendations': recommendations
            }
            logger.info(f"Sending prediction response: {response}")
            return jsonify(response)
        else:
            logger.error("Prediction failed")
            return jsonify({'error': 'Prediction failed'}), 500
            
    except Exception as e:
        logger.error(f"Error in predict route: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/test_model', methods=['GET'])
def test_model():
    """Test endpoint to verify model behavior"""
    test_data = {
        'BMI': 21.0,
        'Smoking': 1,
        'AlcoholDrinking': 0,
        'Stroke': 1,
        'PhysicalHealth': 30,
        'MentalHealth': 21,
        'DiffWalking': 0,
        'Sex': 1,
        'AgeCategory': 6,
        'Race': 0,
        'Diabetic': 1,
        'PhysicalActivity': 1,
        'GenHealth': 2,
        'SleepTime': 4
    }
    
    logger.info("Running test prediction with sample data")
    prediction_result = predict_heart_disease(test_data)
    
    if prediction_result is not None:
        recommendations = get_health_recommendations(test_data, prediction_result['prediction'])
        return jsonify({
            'test_data': test_data,
            'prediction': prediction_result['prediction'],
            'confidence': prediction_result['confidence'],
            'probabilities': prediction_result['probabilities'],
            'recommendations': recommendations
        })
    else:
        return jsonify({'error': 'Test prediction failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)

#py -3.10 -m venv venv310
#.\venv310\Scripts\Activate
#pip install flask
#pip install numpy==1.23.5 scikit-learn==1.2.2
#pip install flask-cors
#python script.py
#http://localhost:5000/test_model