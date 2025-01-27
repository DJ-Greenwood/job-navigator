
// src/services/jobBoards.js

class JobBoardService {
  constructor() {
    // Initialize different job board APIs
    this.apis = {
      // Replace these with actual API endpoints and keys
      indeed: {
        url: process.env.REACT_APP_INDEED_API_URL,
        key: process.env.REACT_APP_INDEED_API_KEY
      },
      linkedin: {
        url: process.env.REACT_APP_LINKEDIN_API_URL,
        key: process.env.REACT_APP_LINKEDIN_API_KEY
      },
      glassdoor: {
        url: process.env.REACT_APP_GLASSDOOR_API_URL,
        key: process.env.REACT_APP_GLASSDOOR_API_KEY
      }
    };
  }

  async searchJobs(query, location) {
    try {
      // Fetch jobs from multiple sources
      const results = await Promise.all([
        this.searchIndeed(query, location),
        this.searchLinkedIn(query, location),
        this.searchGlassdoor(query, location)
      ]);

      // Combine and normalize results
      const combinedJobs = this.normalizeResults(results.flat());
      
      // Analyze for potential ghost jobs
      return this.analyzeJobPostings(combinedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  normalizeResults(jobs) {
    // Normalize job data from different sources into a consistent format
    return jobs.map(job => ({
      id: job.id || Math.random().toString(36).substr(2, 9),
      title: job.title || job.jobTitle || '',
      company: job.company || job.companyName || '',
      location: job.location || job.jobLocation || '',
      description: job.description || job.jobDescription || '',
      postDate: new Date(job.postDate || job.datePosted || Date.now()),
      source: job.source || '',
      url: job.url || job.jobUrl || '',
      salary: job.salary || job.estimatedSalary || 'Not specified'
    }));
  }

  analyzeJobPostings(jobs) {
    // Group jobs by company
    const jobsByCompany = jobs.reduce((acc, job) => {
      if (!acc[job.company]) {
        acc[job.company] = [];
      }
      acc[job.company].push(job);
      return acc;
    }, {});

    // Analyze patterns for each company
    const analysis = Object.entries(jobsByCompany).map(([company, companyJobs]) => {
      const similarJobs = this.findSimilarJobs(companyJobs);
      const repostingPattern = this.analyzeRepostingPattern(companyJobs);
      
      return {
        company,
        totalPostings: companyJobs.length,
        similarJobsCount: similarJobs.length,
        repostingFrequency: repostingPattern.frequency,
        ghostJobScore: this.calculateGhostJobScore(companyJobs, similarJobs, repostingPattern),
        jobs: companyJobs
      };
    });

    return {
      jobs,
      analysis: analysis.sort((a, b) => b.ghostJobScore - a.ghostJobScore)
    };
  }

  findSimilarJobs(jobs) {
    // Find jobs with very similar titles and descriptions
    return jobs.filter((job, index) => {
      return jobs.some((otherJob, otherIndex) => {
        if (index === otherIndex) return false;
        
        const titleSimilarity = this.calculateSimilarity(job.title, otherJob.title);
        const descSimilarity = this.calculateSimilarity(job.description, otherJob.description);
        
        return titleSimilarity > 0.9 && descSimilarity > 0.8;
      });
    });
  }

  analyzeRepostingPattern(jobs) {
    // Analyze how frequently jobs are reposted
    const sortedJobs = jobs.sort((a, b) => a.postDate - b.postDate);
    const timeBetweenPosts = [];
    
    for (let i = 1; i < sortedJobs.length; i++) {
      const timeDiff = sortedJobs[i].postDate - sortedJobs[i-1].postDate;
      timeBetweenPosts.push(timeDiff);
    }

    return {
      frequency: timeBetweenPosts.length > 0 ? 
        timeBetweenPosts.reduce((a, b) => a + b, 0) / timeBetweenPosts.length : 
        0
    };
  }

  calculateGhostJobScore(jobs, similarJobs, repostingPattern) {
    // Calculate a score indicating likelihood of ghost jobs
    // Higher score = higher likelihood
    let score = 0;
    
    // Factor 1: Ratio of similar jobs
    score += (similarJobs.length / jobs.length) * 40;
    
    // Factor 2: Frequent reposting
    if (repostingPattern.frequency > 0) {
      score += Math.min(30, (30 * (7 * 24 * 60 * 60 * 1000) / repostingPattern.frequency));
    }
    
    // Factor 3: Number of active postings
    score += Math.min(30, jobs.length * 2);

    return Math.min(100, score);
  }

  calculateSimilarity(str1, str2) {
    // Simple similarity calculation using Levenshtein distance
    // In production, use a more sophisticated algorithm
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - this.levenshteinDistance(longer, shorter)) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }
}

const jobBoardService = new JobBoardService();
export default jobBoardService;