// src/services/openai.js
import axios from 'axios';
import { OPENAI_CONFIG } from '../config/api.config';

class OpenAIService {
  constructor() {
    this.client = axios.create({
      baseURL: OPENAI_CONFIG.baseURL,
      headers: {
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async generateCompletion(prompt, options = {}) {
    try {
      const response = await this.client.post('', {
        model: options.model || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 150
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate completion');
    }
  }

  async generateJobDescription(title, industry) {
    const prompt = `Create a detailed job description for a ${title} position in the ${industry} industry. Include responsibilities and requirements.`;
    return this.generateCompletion(prompt, { maxTokens: 250 });
  }

  async improveCoverLetter(coverLetter, jobDescription) {
    const prompt = `Improve the following cover letter for a job with this description: 
    Job Description: ${jobDescription}
    
    Cover Letter: ${coverLetter}
    
    Please enhance it to better match the job requirements while maintaining a professional tone.`;
    
    return this.generateCompletion(prompt, { maxTokens: 400 });
  }

  async generateInterviewQuestions(jobTitle) {
    const prompt = `Generate 5 common interview questions for a ${jobTitle} position, including technical and behavioral questions.`;
    return this.generateCompletion(prompt, { maxTokens: 300 });
  }
}

const openAIService = new OpenAIService();
export default openAIService;