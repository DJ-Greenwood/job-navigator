import React from 'react';


// Footer.jsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Job Navigator</h3>
              <p className="text-sm text-gray-400">Your career success partner</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Job Search</li>
                <li>Resume Builder</li>
                <li>Career Resources</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;