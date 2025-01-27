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
        model: options.model || 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature || 1,
        max_tokens: options.maxTokens || 150
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate completion');
    }
  }

  async analyzeJobSearch(searchTerm, location) {
    const prompt = `You are a job market analysis expert. Provide detailed insights about job searches for "${searchTerm}" in ${location}. Provide:
    1. List of relevant job titles
    2. Key skills required
    3. Industry trends
    4. Salary range estimation
    5. Career growth opportunities
    Format as JSON with these keys: relevantTitles, requiredSkills, industryTrends, salaryRange, careerPath`;
    return this.generateCompletion(prompt, { maxTokens: 300 });
  }

  async suggestJobDescriptionImprovements(jobDescription) {
    const prompt = `You are an expert at optimizing job descriptions for maximum relevance and clarity. Analyze this job description and provide suggestions for improvement:
    
    ${jobDescription}
    
    Provide:
    1. Keyword optimization suggestions
    2. Missing important requirements
    3. Clarity improvements
    4. Additional relevant skills to consider
    Format as JSON with these keys: keywordSuggestions, missingRequirements, clarityImprovements, additionalSkills`;

    const completion = await this.generateCompletion(prompt, { maxTokens: 300 });
    const improvements = JSON.parse(completion);
    return {
      keywordSuggestions: improvements.keywordSuggestions,
      missingRequirements: improvements.missingRequirements,
      clarityImprovements: improvements.clarityImprovements,
      additionalSkills: improvements.additionalSkills
    };
    }

  

  async getMarketInsights(jobTitle, location) {
    const prompt = `You are a job market research expert. Provide detailed market insights for ${jobTitle} positions in ${location}. Include:
      1. Market demand analysis
      2. Common requirements
      3. Company types hiring
      4. Remote work availability
      5. Competition level
      Format as JSON with these keys: demand, requirements, companies, remoteWork, competitionLevel`;
      
    const completion = await this.generateCompletion(prompt, { maxTokens: 300 });
    const insights = JSON.parse(completion);
    
    return {
      demand: insights.demand,
      requirements: insights.requirements,
      companies: insights.companies,
      remoteWork: insights.remoteWork,
      competitionLevel: insights.competitionLevel
    };
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