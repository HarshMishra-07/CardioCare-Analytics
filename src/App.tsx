import React, { useState } from 'react';
import { Heart, Shield, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import HeartAnimation from './components/HeartAnimation';
import PredictionForm from './components/PredictionForm';
import ResultsSection from './components/ResultsSection';
import HealthTips from './components/HealthTips';
import { generatePDFReport } from './utils/pdfGenerator';

interface PredictionData {
  BMI: number;
  Smoking: number;
  AlcoholDrinking: number;
  Stroke: number;
  PhysicalHealth: number;
  MentalHealth: number;
  DiffWalking: number;
  Sex: number;
  AgeCategory: number;
  Race: number;
  Diabetic: number;
  PhysicalActivity: number;
  GenHealth: number;
  SleepTime: number;
}

interface PredictionResult {
  prediction: number;
  recommendations: string;
}

function App() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setPredictionLoading] = useState(false);
  const [formData, setFormData] = useState<PredictionData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handlePrediction = async (data: PredictionData) => {
    setPredictionLoading(true);
    setFormData(data);
    console.log('Payload:', data);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      setPredictionResult(result);
      setShowResults(true);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to connect to prediction service. Please ensure the Flask server is running.');
    } finally {
      setPredictionLoading(false);
    }
  };

  const downloadPDFReport = () => {
    if (!predictionResult || !formData) return;
    
    generatePDFReport({
      predictionResult,
      formData,
      recommendations: predictionResult.recommendations
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white shadow-sm">
        <div className="container-fluid px-4">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Heart className="text-red-500 me-2" size={28} />
            <span className="fw-bold text-dark fs-4">CardioCare Analytics</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#assessment">Assessment</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#results">Results</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#health-tips">Health Tips</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-5 mt-5">
        <div className="container-fluid px-4">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-7 col-md-8">
              <div className="pe-lg-5">
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <Shield className="text-blue-600 me-2" size={24} />
                    <span className="badge bg-blue-100 text-blue-800 px-3 py-2 rounded-pill fw-medium">
                      Professional Heart Health Assessment
                    </span>
                  </div>
                  <h1 className="display-4 fw-bold text-dark mb-4">
                    Advanced Heart Disease <span className="text-red-500">Risk Assessment</span>
                  </h1>
                  <p className="lead text-muted mb-4">
                    Your heart is the engine that keeps your body running. Our advanced assessment tool 
                    helps you understand your cardiovascular risk and provides personalized recommendations for 
                    optimal heart health.
                  </p>
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-green-500 me-2" size={20} />
                      <span className="text-muted">Medical-Grade Analysis</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-green-500 me-2" size={20} />
                      <span className="text-muted">Expert Health Recommendations</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-green-500 me-2" size={20} />
                      <span className="text-muted">Detailed PDF Reports</span>
                    </div>
                  </div>
                  <a href="#assessment" className="btn btn-primary btn-lg px-4 py-3 rounded-pill fw-medium">
                    Start Your Assessment
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-4">
              <HeartAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section id="assessment" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <Activity className="text-red-500 mx-auto mb-3" size={48} />
            <h2 className="display-5 fw-bold text-dark mb-3">Heart Health Assessment</h2>
            <p className="lead text-muted max-w-2xl mx-auto">
              Complete the form below to receive your personalized heart disease risk assessment
            </p>
          </div>
          
          <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      {showResults && predictionResult && (
        <ResultsSection 
          result={predictionResult}
          onDownloadPDF={downloadPDFReport}
        />
      )}

      {/* Health Tips */}
      <HealthTips />

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <Heart className="text-red-500 me-2" size={24} />
            <span className="fw-bold fs-5">CardioCare Analytics</span>
          </div>
          <p className="mb-0 text-muted">
            © 2024 CardioCare Analytics. Professional heart health assessment platform.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;