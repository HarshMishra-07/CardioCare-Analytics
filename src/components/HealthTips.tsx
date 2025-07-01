import React from 'react';
import { Heart, Activity, Apple, Moon, Smile, Shield } from 'lucide-react';

const HealthTips: React.FC = () => {
  const healthTips = [
    {
      icon: <Activity className="text-blue-500" size={32} />,
      title: "Regular Exercise",
      description: "Aim for at least 150 minutes of moderate-intensity aerobic activity weekly to strengthen your heart and improve circulation.",
      image: "https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Apple className="text-green-500" size={32} />,
      title: "Heart-Healthy Diet",
      description: "Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats while limiting sodium and processed foods.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Moon className="text-purple-500" size={32} />,
      title: "Quality Sleep",
      description: "Get 7-9 hours of quality sleep nightly to help your heart recover and maintain optimal cardiovascular health.",
      image: "https://images.pexels.com/photos/945685/pexels-photo-945685.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Smile className="text-yellow-500" size={32} />,
      title: "Stress Management",
      description: "Practice relaxation techniques, meditation, or hobbies to reduce stress and protect your heart from harmful effects.",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Shield className="text-red-500" size={32} />,
      title: "Avoid Smoking",
      description: "Quit smoking and avoid secondhand smoke to dramatically reduce your risk of heart disease and stroke.",
      image: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Heart className="text-pink-500" size={32} />,
      title: "Regular Check-ups",
      description: "Schedule regular health screenings to monitor blood pressure, cholesterol, and other heart disease risk factors.",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section id="health-tips" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <Heart className="text-red-500 mx-auto mb-3" size={48} />
          <h2 className="display-5 fw-bold text-dark mb-3">Heart Health & Lifestyle Tips</h2>
          <p className="lead text-muted max-w-2xl mx-auto">
            Simple, effective strategies to maintain a healthy heart and improve your overall well-being
          </p>
        </div>

        <div className="row g-4">
          {healthTips.map((tip, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title}
                    className="card-img-top" 
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 m-3 bg-white rounded-circle p-2 shadow">
                    {tip.icon}
                  </div>
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold text-dark mb-3">{tip.title}</h5>
                  <p className="card-text text-muted lh-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reminder Section */}
        <div className="text-center mt-5 mb-4">
          <div className="alert alert-info border-0 d-inline-flex align-items-center gap-2 px-4 py-3">
            <Heart className="text-blue-600" size={20} />
            <span className="text-blue-800">
              Remember: Small lifestyle changes can make a big difference in your heart health!
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease-in-out;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default HealthTips;