import React, { useState, useEffect } from 'react';
import { User, Activity, Heart, Brain } from 'lucide-react';

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

interface PredictionFormProps {
  onSubmit: (data: PredictionData) => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PredictionData>({
    BMI: 0,
    Smoking: 0,
    AlcoholDrinking: 0,
    Stroke: 0,
    PhysicalHealth: 0,
    MentalHealth: 0,
    DiffWalking: 0,
    Sex: 1,
    AgeCategory: 0,
    Race: 0,
    Diabetic: 0,
    PhysicalActivity: 1,
    GenHealth: 2,
    SleepTime: 0
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = 
      formData.BMI >= 10 && formData.BMI <= 50 &&
      formData.PhysicalHealth >= 0 && formData.PhysicalHealth <= 30 &&
      formData.MentalHealth >= 0 && formData.MentalHealth <= 30 &&
      formData.SleepTime >= 1 && formData.SleepTime <= 24;
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    let numValue: number;
    
    // Use parseFloat only for BMI
    if (field === 'BMI') {
      numValue = parseFloat(value) || 0;
    } else {
      numValue = parseInt(value) || 0;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card border-0 shadow-lg">
      <div className="row g-0">
        <div className="col-md-4">
          <div className="card-img-container h-100 bg-gradient-primary d-flex align-items-center justify-content-center">
            <img 
              src="https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Medical Assessment" 
              className="img-fluid rounded-start h-100 object-cover"
              style={{ objectFit: 'cover', minHeight: '600px' }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Personal Information Section */}
                <div className="col-12">
                  <div className="d-flex align-items-center mb-3">
                    <User className="text-primary me-2" size={20} />
                    <h5 className="mb-0 text-dark fw-semibold">Personal Information</h5>
                  </div>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Age Group</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.AgeCategory}
                    onChange={(e) => handleInputChange('AgeCategory', e.target.value)}
                    required
                  >
                    <option value={0}>18-24</option>
                    <option value={1}>25-29</option>
                    <option value={2}>30-34</option>
                    <option value={3}>35-39</option>
                    <option value={4}>40-44</option>
                    <option value={5}>45-49</option>
                    <option value={6}>50-54</option>
                    <option value={7}>55-59</option>
                    <option value={8}>60-64</option>
                    <option value={9}>65-69</option>
                    <option value={10}>70-74</option>
                    <option value={11}>75-79</option>
                    <option value={12}>80 or older</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Sex</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.Sex}
                    onChange={(e) => handleInputChange('Sex', e.target.value)}
                    required
                  >
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Race/Ethnicity</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.Race}
                    onChange={(e) => handleInputChange('Race', e.target.value)}
                    required
                  >
                    <option value={0}>White</option>
                    <option value={1}>Black or African American</option>
                    <option value={2}>Asian</option>
                    <option value={3}>American Indian or Alaska Native</option>
                    <option value={4}>Native Hawaiian or Other Pacific Islander</option>
                    <option value={5}>Multiple/Other</option>
                  </select>
                </div>

                {/* Physical Health Section */}
                <div className="col-12 mt-5">
                  <div className="d-flex align-items-center mb-3">
                    <Activity className="text-success me-2" size={20} />
                    <h5 className="mb-0 text-dark fw-semibold">Physical Health</h5>
                  </div>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">BMI</label>
                  <input 
                    type="number" 
                    className="form-control border-2" 
                    placeholder="e.g., 24.5"
                    step="0.1"
                    min="10"
                    max="50"
                    value={formData.BMI || ''}
                    onChange={(e) => handleInputChange('BMI', e.target.value)}
                    required 
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Sleep Time (hours)</label>
                  <input 
                    type="number" 
                    className="form-control border-2" 
                    placeholder="e.g., 7"
                    min="1"
                    max="24"
                    value={formData.SleepTime || ''}
                    onChange={(e) => handleInputChange('SleepTime', e.target.value)}
                    required 
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">General Health</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.GenHealth}
                    onChange={(e) => handleInputChange('GenHealth', e.target.value)}
                    required
                  >
                    <option value={0}>Excellent</option>
                    <option value={1}>Very Good</option>
                    <option value={2}>Good</option>
                    <option value={3}>Fair</option>
                    <option value={4}>Poor</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Physical Health (days not good in past 30)</label>
                  <input 
                    type="number" 
                    className="form-control border-2" 
                    placeholder="0-30"
                    min="0"
                    max="30"
                    value={formData.PhysicalHealth || ''}
                    onChange={(e) => handleInputChange('PhysicalHealth', e.target.value)}
                    required 
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Physical Activity</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.PhysicalActivity}
                    onChange={(e) => handleInputChange('PhysicalActivity', e.target.value)}
                    required
                  >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Difficulty Walking</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.DiffWalking}
                    onChange={(e) => handleInputChange('DiffWalking', e.target.value)}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                {/* Mental Health & Lifestyle Section */}
                <div className="col-12 mt-5">
                  <div className="d-flex align-items-center mb-3">
                    <Brain className="text-purple-600 me-2" size={20} />
                    <h5 className="mb-0 text-dark fw-semibold">Mental Health & Lifestyle</h5>
                  </div>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Mental Health (days not good in past 30)</label>
                  <input 
                    type="number" 
                    className="form-control border-2" 
                    placeholder="0-30"
                    min="0"
                    max="30"
                    value={formData.MentalHealth || ''}
                    onChange={(e) => handleInputChange('MentalHealth', e.target.value)}
                    required 
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Smoking</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.Smoking}
                    onChange={(e) => handleInputChange('Smoking', e.target.value)}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Alcohol Drinking</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.AlcoholDrinking}
                    onChange={(e) => handleInputChange('AlcoholDrinking', e.target.value)}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                {/* Medical History Section */}
                <div className="col-12 mt-5">
                  <div className="d-flex align-items-center mb-3">
                    <Heart className="text-red-500 me-2" size={20} />
                    <h5 className="mb-0 text-dark fw-semibold">Medical History</h5>
                  </div>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Previous Stroke</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.Stroke}
                    onChange={(e) => handleInputChange('Stroke', e.target.value)}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium text-dark">Diabetes</label>
                  <select 
                    className="form-select border-2" 
                    value={formData.Diabetic}
                    onChange={(e) => handleInputChange('Diabetic', e.target.value)}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                <div className="col-12 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-medium"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Analyzing Your Health Data...
                      </>
                    ) : (
                      'Generate Health Assessment'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;