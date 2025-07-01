import jsPDF from 'jspdf';

type RGB = [number, number, number];

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

interface PDFReportData {
  predictionResult: PredictionResult;
  formData: PredictionData;
  recommendations: string;
}

export const generatePDFReport = (data: PDFReportData) => {
  const { predictionResult, formData, recommendations } = data;
  const doc = new jsPDF();
  
  // Set up colors and fonts
  const primaryColor: RGB = [59, 130, 246];   // Blue
  const successColor: RGB = [34, 197, 94];    // Green
  const warningColor: RGB = [245, 158, 11];   // Yellow
  const textColor: RGB = [31, 41, 55];        // Gray-800
  
  let yPos = 20;
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('CardioCare Analytics', 20, 20);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Heart Disease Risk Assessment Report', 20, 27);
  
  yPos = 50;
  
  // Report Date
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 150, yPos);
  
  yPos += 20;
  
  // Assessment Results Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Assessment Results', 20, yPos);
  
  yPos += 10;
  
  // Result box
  const isHighRisk = predictionResult.prediction === 1;
  const resultColor: RGB = isHighRisk ? warningColor : successColor;
  
  doc.setFillColor(resultColor[0], resultColor[1], resultColor[2]);
  doc.rect(20, yPos, 170, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isHighRisk ? 'Higher Risk Detected' : 'Low Risk Assessment', 
    25, 
    yPos + 10
  );
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const resultText = isHighRisk
    ? 'Consult healthcare professional for evaluation'
    : 'Continue maintaining healthy lifestyle habits';
  doc.text(resultText, 25, yPos + 18);
  
  yPos += 40;
  
  // Patient Information Section
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Patient Information', 20, yPos);
  
  yPos += 15;
  
  const patientInfo = [
    ['Age Group:', getAgeGroup(formData.AgeCategory)],
    ['Sex:', formData.Sex === 1 ? 'Male' : 'Female'],
    ['BMI:', formData.BMI.toString()],
    ['Sleep Hours:', formData.SleepTime.toString()],
    ['General Health:', getGeneralHealth(formData.GenHealth)],
    ['Physical Activity:', formData.PhysicalActivity === 1 ? 'Yes' : 'No'],
    ['Smoking:', formData.Smoking === 1 ? 'Yes' : 'No'],
    ['Alcohol:', formData.AlcoholDrinking === 1 ? 'Yes' : 'No'],
    ['Diabetes:', formData.Diabetic === 1 ? 'Yes' : 'No']
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  let col1Y = yPos;
  let col2Y = yPos;
  
  patientInfo.forEach((info, index) => {
    const isLeftColumn = index < Math.ceil(patientInfo.length / 2);
    const xPos = isLeftColumn ? 20 : 110;
    const currentY = isLeftColumn ? col1Y : col2Y;
    
    doc.setFont('helvetica', 'bold');
    doc.text(info[0], xPos, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(info[1], xPos + 35, currentY);
    
    if (isLeftColumn) {
      col1Y += 8;
    } else {
      col2Y += 8;
    }
  });
  
  yPos = Math.max(col1Y, col2Y) + 15;
  
  // Health Recommendations Section
  if (recommendations) {
    // Check if we need a new page
    if (yPos > 200) {
      doc.addPage();
      yPos = 30;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('AI-Health Recommendations', 20, yPos);
    
    yPos += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Split recommendations into lines that fit the page
    const recommendationLines = doc.splitTextToSize(recommendations, 170);
    
    recommendationLines.forEach((line: string) => {
      if (yPos > 270) { // Near bottom of page
        doc.addPage();
        yPos = 30;
      }
      doc.text(line, 20, yPos);
      yPos += 5;
    });
    
    yPos += 10;
  }
  
  // Disclaimer
  if (yPos > 240) {
    doc.addPage();
    yPos = 30;
  }
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Important Disclaimer', 20, yPos);
  
  yPos += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const disclaimerText = 'This assessment is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for medical concerns. These recommendations are based on general health guidelines and may not be suitable for all individuals.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, 170);
  
  disclaimerLines.forEach((line: string) => {
    doc.text(line, 20, yPos);
    yPos += 5;
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    doc.text('CardioCare Analytics - Professional Heart Health Assessment', 20, 285);
  }
  
  // Save the PDF
  const fileName = `heart-health-report-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

const getAgeGroup = (ageCategory: number): string => {
  const ageGroups = [
    '18-24', '25-29', '30-34', '35-39', '40-44', '45-49',
    '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'
  ];
  return ageGroups[ageCategory] || 'Unknown';
};

const getGeneralHealth = (health: number): string => {
  const healthLevels = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  return healthLevels[health] || 'Unknown';
};