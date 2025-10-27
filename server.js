import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build the conversation context
    let prompt = message;
    
    // If there's conversation history, include it for context
    if (conversationHistory && conversationHistory.length > 0) {
      const context = conversationHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      prompt = `${context}\nUser: ${message}\nAssistant:`;
    }

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ 
      success: true, 
      response: text 
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate response. Please try again.',
      details: error.message 
    });
  }
});

// Prediction endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const { seniorCitizen, tenure, monthlyCharges, contract, paymentMethod } = req.body;

    // Validate required fields
    if (
      seniorCitizen === undefined || 
      !tenure || 
      !monthlyCharges || 
      !contract || 
      !paymentMethod
    ) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['seniorCitizen', 'tenure', 'monthlyCharges', 'contract', 'paymentMethod']
      });
    }

    // Validate data types and ranges
    if (tenure < 0 || tenure > 100) {
      return res.status(400).json({ error: 'Tenure must be between 0 and 100 months' });
    }

    if (monthlyCharges <= 0) {
      return res.status(400).json({ error: 'Monthly charges must be greater than 0' });
    }

    // Calculate churn probability based on factors
    let churnProbability = 0;

    // Contract type impact
    if (contract === 'Month-to-month') {
      churnProbability += 35;
    } else if (contract === 'One year') {
      churnProbability += 15;
    } else if (contract === 'Two year') {
      churnProbability += 5;
    }

    // Monthly charges impact
    if (monthlyCharges > 80) {
      churnProbability += 25;
    } else if (monthlyCharges > 60) {
      churnProbability += 18;
    } else if (monthlyCharges > 40) {
      churnProbability += 12;
    } else {
      churnProbability += 8;
    }

    // Tenure impact (inverse relationship)
    if (tenure < 6) {
      churnProbability += 30;
    } else if (tenure < 12) {
      churnProbability += 22;
    } else if (tenure < 24) {
      churnProbability += 12;
    } else {
      churnProbability += 5;
    }

    // Payment method impact
    if (paymentMethod === 'Electronic check') {
      churnProbability += 20;
    } else if (paymentMethod === 'Mailed check') {
      churnProbability += 12;
    } else if (paymentMethod === 'Bank transfer') {
      churnProbability += 7;
    } else {
      churnProbability += 6;
    }

    // Senior citizen impact
    if (seniorCitizen === '1') {
      churnProbability += 15;
    } else {
      churnProbability += 8;
    }

    // Normalize to percentage (cap at 100)
    churnProbability = Math.min(churnProbability, 100);

    // Determine risk level
    const riskLevel = churnProbability > 70 ? 'High' : churnProbability > 40 ? 'Medium' : 'Low';

    // Calculate individual factor impacts
    const factors = [
      {
        name: 'Contract Type',
        impact: contract === 'Month-to-month' ? 85 : contract === 'One year' ? 45 : 25,
        value: contract
      },
      {
        name: 'Monthly Charges',
        impact: monthlyCharges > 80 ? 80 : monthlyCharges > 60 ? 60 : monthlyCharges > 40 ? 45 : 30,
        value: `$${monthlyCharges}`
      },
      {
        name: 'Tenure',
        impact: tenure < 6 ? 90 : tenure < 12 ? 70 : tenure < 24 ? 40 : 20,
        value: `${tenure} months`
      },
      {
        name: 'Payment Method',
        impact: paymentMethod === 'Electronic check' ? 70 : 
                paymentMethod === 'Mailed check' ? 50 : 
                paymentMethod === 'Bank transfer' ? 30 : 25,
        value: paymentMethod
      },
      {
        name: 'Senior Citizen Status',
        impact: seniorCitizen === '1' ? 55 : 25,
        value: seniorCitizen === '1' ? 'Yes' : 'No'
      }
    ];

    // Generate recommendations based on risk level
    const recommendations = churnProbability > 50
      ? [
          'Consider offering loyalty incentives',
          'Improve customer support',
          'Upgrade contract terms'
        ]
      : [
          'Monitor engagement',
          'Maintain service quality',
          'Regular check-ins'
        ];

    // Construct complete prediction response
    const predictionResult = {
      churnProbability: parseFloat(churnProbability.toFixed(1)),
      riskLevel,
      confidence: 85,
      factors,
      recommendations
    };

    res.json(predictionResult);

  } catch (error) {
    console.error('Prediction Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate prediction. Please try again.',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Chat API available at http://localhost:${PORT}/api/chat`);
});
