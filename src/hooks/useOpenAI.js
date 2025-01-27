// src/hooks/useOpenAI.js
import { useState } from 'react';
import openAIService from '../services/openai';

export const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateJobDescription = async (title, industry) => {
    try {
      setLoading(true);
      setError(null);
      const result = await openAIService.generateJobDescription(title, industry);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const improveCoverLetter = async (coverLetter, jobDescription) => {
    try {
      setLoading(true);
      setError(null);
      const result = await openAIService.improveCoverLetter(coverLetter, jobDescription);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateInterviewQuestions = async (jobTitle) => {
    try {
      setLoading(true);
      setError(null);
      const result = await openAIService.generateInterviewQuestions(jobTitle);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateJobDescription,
    improveCoverLetter,
    generateInterviewQuestions
  };
};