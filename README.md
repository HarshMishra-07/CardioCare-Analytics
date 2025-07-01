# CardioCare Analytics

Professional heart disease risk assessment platform with personalised Health recommendations.

CardioCare Analytics

## Features

- Advanced heart disease risk prediction using machine learning
- Real-time health assessment form
- Personalized Health recommendations
- Detailed PDF report generation
- Interactive heart rate visualization
- Mobile-responsive design

## Technology Stack

- **Frontend:**
  - React 18.3
  - TypeScript
  - Tailwind CSS
  - Bootstrap 5
  - Lucide React Icons
  - HTML2Canvas & jsPDF for report generation

- **Backend:**
  - Python Flask API
  - scikit-learn for ML model
  - NumPy for numerical computations
  - Pickle for model serialization

## Setup Instructions

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HarshMishra-07/CardioCare-Analytics.git
   cd cardiocare-analytics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Create and activate Python virtual environment:
   ```bash
   py -3.10 -m venv venv310
   .\venv310\Scripts\activate
   ```

2. Install Python dependencies:
   ```bash
   pip install flask numpy==1.23.5 scikit-learn==1.2.2 flask-cors
   ```

3. Run Flask server:
   ```bash
   python script.py
   ```

## Usage

1. Access the application at `http://localhost:5173`
2. Fill out the health assessment form
3. Get instant risk assessment and personalized recommendations
4. Download detailed PDF report

## API Endpoints

- `POST /predict`: Submit health data for prediction
- `GET /test_model`: Test endpoint for model verification


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Heart disease dataset from UCI Machine Learning Repository
- Medical guidelines from American Heart Association