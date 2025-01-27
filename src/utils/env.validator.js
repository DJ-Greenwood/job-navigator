// src/utils/env.validator.js
export const validateEnvironment = () => {
    const requiredEnvVars = ['REACT_APP_OPENAI_API_KEY'];
    
    const missingVars = requiredEnvVars.filter(
      varName => !process.env[varName]
    );
  
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.'
      );
    }
  };
  