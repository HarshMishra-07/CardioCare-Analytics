import React from 'react';

const HeartAnimation: React.FC = () => {
  return (
    <div className="heart-rate-container d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
      <div className="position-relative">
        <div className="heart-rate">
          <svg 
            version="1.0" 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" 
            width="350px" 
            height="180px" 
            viewBox="0 0 350 180" 
            className="heartbeat-svg"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <polyline 
              fill="none" 
              stroke="url(#heartGradient)" 
              strokeWidth="4" 
              strokeMiterlimit="10"
              points="0,90 77,90 89,66 101,90 113,90 125,111 143,18 162,146 168,90 194,90 206,81 218,90 350,90"
              className="heartbeat-line"
            />
          </svg>
          <div className="fade-in"></div>
          <div className="fade-out"></div>
        </div>
        <div className="text-center mt-3">
          <div className="badge bg-red-100 text-red-800 px-3 py-2 rounded-pill">
            <i className="fas fa-heartbeat me-1"></i>
            Live Heart Monitoring
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .heart-rate-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }
        
        .heart-rate {
          width: 350px;
          height: 180px;
          position: relative;
          margin: 20px auto;
          background: #000;
          border-radius: 15px;
          padding: 20px;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .heartbeat-line {
          filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5));
        }
        
        .fade-in {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #000;
          top: 0;
          right: 0;
          animation: heartRateIn 2.5s linear infinite;
          border-radius: 15px;
        }
        
        .fade-out {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
          animation: heartRateOut 2.5s linear infinite;
          border-radius: 15px;
        }
        
        @keyframes heartRateIn {
          0% { width: 100%; }
          50% { width: 0; }
          100% { width: 0; }
        }
        
        @keyframes heartRateOut {
          0% { left: -100%; }
          30% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HeartAnimation;