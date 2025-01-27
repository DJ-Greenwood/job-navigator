
// src/config/api.config.js
if (!process.env.REACT_APP_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your .env file');
  }
  
  export const OPENAI_CONFIG = {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1/chat/completions'
  };