import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfig, safetySettings, systemPrompt } from '../config/geminiConfig';

let genAI = null;
let model = null;

// Initialize Gemini AI
export const initializeGemini = () => {
  if (!geminiConfig.apiKey || geminiConfig.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('Gemini API key not configured');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
    model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      safetySettings: safetySettings
    });
    return true;
  } catch (error) {
    console.error('Error initializing Gemini:', error);
    return false;
  }
};

// Chat with AI assistant
export const chatWithAI = async (userMessage, conversationHistory = []) => {
  if (!model) {
    const initialized = initializeGemini();
    if (!initialized) {
      return {
        error: true,
        message: "AI assistant is not configured. Please add your Gemini API key."
      };
    }
  }

  try {
    // Build conversation with system prompt
    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      error: false,
      message: text,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Provide helpful error message
    let errorMsg = "Sorry, I'm having trouble connecting! ";
    if (error.message && error.message.includes('API key')) {
      errorMsg += "Please check your API key at https://makersuite.google.com/app/apikey";
    } else if (error.message && error.message.includes('404')) {
      errorMsg += "The AI model might not be available yet. Please try enabling the Generative Language API in your Google Cloud Console.";
    } else {
      errorMsg += "Please try again in a moment!";
    }
    
    return {
      error: true,
      message: errorMsg,
      details: error.message
    };
  }
};

// Get goal suggestions based on interests
export const getGoalSuggestions = async (interests) => {
  const prompt = `A 10-year-old is interested in: ${interests}. Suggest 5 fun, achievable daily goals they could track. Keep each suggestion to one short sentence.`;
  return await chatWithAI(prompt);
};

// Get motivational message based on progress
export const getMotivationalMessage = async (points, streak, goalsCompleted) => {
  const prompt = `A kid has ${points} points, a ${streak}-day streak, and completed ${goalsCompleted} goals. Give them a short, enthusiastic motivational message!`;
  return await chatWithAI(prompt);
};

// Get help with app features
export const getAppHelp = async (question) => {
  const appContext = `This is a goal-tracking app where kids can:
  - Create and track daily goals
  - Earn 10 points for completing each goal
  - Build streaks by completing goals daily
  - Share goals in the community feed
  - Add recommendations for books, restaurants, and parks
  
  User question: ${question}`;
  
  return await chatWithAI(appContext);
};

// Analyze goal and provide tips
export const analyzeGoal = async (goalTitle, goalDescription) => {
  const prompt = `A kid wants to create this goal: "${goalTitle}". Description: "${goalDescription}". Is this a good goal? Give brief, encouraging feedback and one tip to succeed.`;
  return await chatWithAI(prompt);
};
