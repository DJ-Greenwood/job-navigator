import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/globals.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white border-gray-200 rounded-lg px-4 lg:px-4 py-4 shadow-md">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className="flex items-center lg:order-1">
                    <button
                        onClick={toggleDropdown}
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-dropdown"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} justify-between items-center w-full rounded-lg lg:flex lg:w-auto`} id="navbar-dropdown">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to="/find-job" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-3">
                                    Find a Job
                                </Link>
                            </li>
                            <li>
                                <Link to="/keep-job" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-3">
                                    Keep Your Job
                                </Link>
                            </li>
                            <li>
                                <Link to="/enjoy-job" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-3">
                                    Enjoy Your Job
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );

};
export default Sidebar;