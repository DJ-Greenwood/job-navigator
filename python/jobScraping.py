import requests
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
import random
from typing import Dict, List, Optional
import logging

class JobScraper:
    def __init__(self, base_url: str):
        """
        Initialize the job scraper with a base URL.
        
        Args:
            base_url (str): The base URL of the job site to scrape
        """
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Set up logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename='job_scraper.log'
        )
        self.logger = logging.getLogger(__name__)

    def search_jobs(self, job_title: str, location: Optional[str] = None, 
                   max_pages: int = 5) -> List[Dict]:
        """
        Search for jobs based on job title and location.
        
        Args:
            job_title (str): The job title to search for
            location (str, optional): The location to search in
            max_pages (int): Maximum number of pages to scrape
            
        Returns:
            List[Dict]: List of job listings
        """
        all_jobs = []
        
        for page in range(1, max_pages + 1):
            try:
                # Construct search URL
                search_url = self._build_search_url(job_title, location, page)
                
                # Make request
                response = self.session.get(search_url)
                response.raise_for_status()
                
                # Parse jobs from page
                soup = BeautifulSoup(response.text, 'html.parser')
                page_jobs = self._parse_job_listings(soup)
                
                if not page_jobs:
                    break
                    
                all_jobs.extend(page_jobs)
                
                # Add random delay between requests
                sleep(random.uniform(1, 3))
                
                self.logger.info(f"Scraped page {page}, found {len(page_jobs)} jobs")
                
            except Exception as e:
                self.logger.error(f"Error scraping page {page}: {str(e)}")
                break
        
        return all_jobs

    def _build_search_url(self, job_title: str, location: Optional[str], 
                         page: int) -> str:
        """Build the search URL based on parameters."""
        # This method should be customized based on the specific job site's URL structure
        url = f"{self.base_url}/search?"
        params = {
            'q': job_title,
            'page': page
        }
        if location:
            params['l'] = location
        
        return requests.Request('GET', url, params=params).prepare().url

    def _parse_job_listings(self, soup: BeautifulSoup) -> List[Dict]:
        """
        Parse job listings from the page.
        This method should be customized based on the specific job site's HTML structure.
        """
        jobs = []
        # Find all job listing containers
        # Note: These selectors need to be adjusted based on the specific website
        job_cards = soup.find_all('div', class_='job-card')
        
        for card in job_cards:
            try:
                job = {
                    'title': card.find('h2', class_='job-title').text.strip(),
                    'company': card.find('div', class_='company-name').text.strip(),
                    'location': card.find('div', class_='location').text.strip(),
                    'description': card.find('div', class_='description').text.strip(),
                    'link': self.base_url + card.find('a')['href'],
                    'date_posted': card.find('div', class_='date').text.strip()
                }
                jobs.append(job)
            except AttributeError as e:
                self.logger.warning(f"Error parsing job card: {str(e)}")
                continue
                
        return jobs

    def get_company_job_count(self, company_name: str) -> int:
        """
        Get the total number of open jobs for a specific company.
        
        Args:
            company_name (str): Name of the company
            
        Returns:
            int: Total number of open jobs
        """
        try:
            url = f"{self.base_url}/company/{company_name}"
            response = self.session.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            # This selector needs to be adjusted based on the specific website
            job_count = soup.find('div', class_='job-count').text
            
            # Extract number from text (e.g., "1,234 open positions")
            return int(job_count.split()[0].replace(',', ''))
            
        except Exception as e:
            self.logger.error(f"Error getting job count for {company_name}: {str(e)}")
            return 0

    def save_to_csv(self, jobs: List[Dict], filename: str = 'jobs.csv'):
        """Save the job listings to a CSV file."""
        df = pd.DataFrame(jobs)
        df.to_csv(filename, index=False)
        self.logger.info(f"Saved {len(jobs)} jobs to {filename}")

def main():
    # Example usage
    web_sites = ['https://www.linkedin.com/jobs', 'https://www.indeed.com/']
    scraper = JobScraper('https://www.linkedin.com/jobs/')
    
    # Search for jobs
    job_title = "Python Developer"
    location = "New York"
    jobs = scraper.search_jobs(job_title, location)
    
    # Get job counts for specific companies
    companies = set(job['company'] for job in jobs)
    for company in companies:
        count = scraper.get_company_job_count(company)
        print(f"{company}: {count} open positions")
    
    # Save results
    scraper.save_to_csv(jobs, 'python_jobs_ny.csv')

if __name__ == "__main__":
    main()