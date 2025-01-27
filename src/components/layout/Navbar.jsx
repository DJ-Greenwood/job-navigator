import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// Navbar.jsx
const Navbar = () => {
    return (
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4 shadow-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Sidebar />
          <Link to="/" className="flex items-center lg:order-2 mx-auto">
            <span className="self-center text-xl font-semibold text-blue-600">Job Navigator</span>
          </Link>
          <div className="flex items-center lg:order-3">
            <Link to="/login" className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2">
              Log in
            </Link>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 ml-2">
              Get started
            </Link>
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;