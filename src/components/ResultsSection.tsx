import React from 'react';
import { AlertTriangle, CheckCircle, Download } from 'lucide-react';

interface PredictionResult {
  prediction: number;
  recommendations: string;
}

interface ResultsSectionProps {
  result: PredictionResult;
  onDownloadPDF: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onDownloadPDF }) => {
  const isHighRisk = result.prediction === 1;
  
  return (
    <section id="results" className={`py-5 ${isHighRisk ? 'bg-gradient-warning' : 'bg-gradient-success'}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  {isHighRisk ? (
                    <AlertTriangle className="text-warning mx-auto mb-3" size={64} />
                  ) : (
                    <CheckCircle className="text-success mx-auto mb-3" size={64} />
                  )}
                  
                  <h2 className="display-5 fw-bold mb-4 text-dark">
                    Your Heart Health Assessment Results
                  </h2>
                </div>
                
                <div className={`alert ${isHighRisk ? 'alert-warning' : 'alert-success'} border-0 shadow-sm p-4 mb-4`}>
                  <h4 className="fw-bold mb-3 d-flex align-items-center">
                    {isHighRisk ? (
                      <>
                        <AlertTriangle className="me-2 flex-shrink-0" size={24} />
                        <span>Higher Risk Detected</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="me-2 flex-shrink-0" size={24} />
                        <span>Low Risk Assessment</span>
                      </>
                    )}
                  </h4>
                  <p className="mb-0 fs-5">
                    {isHighRisk
                      ? "Based on the provided information, you have a higher risk of heart disease. We recommend consulting with a healthcare professional for further evaluation and personalized guidance."
                      : "Based on the provided information, you have a low risk of heart disease. Continue maintaining your healthy lifestyle habits!"
                    }
                  </p>
                </div>

                {/* Recommendations Section */}
                {result.recommendations && (
                  <div className="bg-light rounded-3 p-4 mb-4">
                    <h4 className="fw-bold mb-3">Personalized Health Recommendations</h4>
                    <div className="recommendations-content" style={{ whiteSpace: 'pre-line' }}>
                      {result.recommendations}
                    </div>
                  </div>
                )}

                <div className="text-center mt-4">
                  <button 
                    className="btn btn-success btn-lg px-5 py-3 rounded-pill fw-medium d-inline-flex align-items-center justify-content-center gap-2"
                    onClick={onDownloadPDF}
                  >
                    <Download size={20} />
                    Download PDF Report
                  </button>
                </div>

                <div className="alert alert-info border-0 bg-blue-50 text-blue-800 mt-4">
                  <p className="mb-0">
                    <strong>Important:</strong> This assessment is for informational purposes only and should not replace professional medical advice. 
                    Always consult with qualified healthcare providers for medical concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-gradient-success {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }
        .bg-gradient-warning {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        .recommendations-content {
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

export default ResultsSection;