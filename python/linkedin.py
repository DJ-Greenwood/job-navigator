import requests
from bs4 import BeautifulSoup
import pandas as pd
import time


class LinkedInJobScraper:
    def __init__(self, search_query, location, pages=1):
        self.search_query = search_query
        self.location = location
        self.pages = pages
        self.jobs = []

    def build_url(self, page):
        base_url = 'https://www.linkedin.com/jobs/search/'
        params = f'?keywords={self.search_query}&location={self.location}&start={page * 25}'
        return base_url + params

    def scrape_jobs(self):
        for page in range(self.pages):
            url = self.build_url(page)
            print(f'Scraping page {page + 1}: {url}')
            response = requests.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                job_cards = soup.find_all('div', class_='base-card')  # Update this selector if needed
                for job_card in job_cards:
                    try:

                        job_title = job_card.find('h3', class_='job-card-list__title').text.strip() if job_card.find('h3', class_='job-card-list__title') else 'N/A'
                        company_name = job_card.find('h4', class_='job-card-container__company-name').text.strip() if job_card.find('h4', class_='job-card-container__company-name') else 'N/A'
                        location = job_card.find('span', class_='job-search-card__location').text.strip() if job_card.find('span', class_='job-search-card__location') else 'N/A'
                        date_posted = job_card.find('time')['datetime'] if job_card.find('time') else 'N/A'

                        self.jobs.append({
                            'Title': job_title,
                            'Company': company_name,
                            'Location': location,
                            'Date Posted': date_posted
                        })
                    except Exception as e:
                        print(f"Error parsing job card: {e}")
                time.sleep(2)  # Be polite and don't overwhelm the server
            else:
                print(f'Failed to retrieve page {page + 1}')

    def save_to_csv(self, filename='linkedin_jobs.csv'):
        df = pd.DataFrame(self.jobs)
        df.to_csv(filename, index=False)
        print(f'Saved {len(self.jobs)} jobs to {filename}')


if __name__ == "__main__":

    scraper = LinkedInJobScraper(search_query='Software Engineer', location='United States', pages=2)


    scraper.scrape_jobs()
    scraper.save_to_csv()

