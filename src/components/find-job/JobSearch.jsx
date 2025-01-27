import React, { useState, useEffect } from 'react';
import { Search, Brain, TrendingUp, DollarSign, Briefcase, Loader2 } from 'lucide-react';
import openAIService from '../../services/openai';

const JobSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchAnalysis, setSearchAnalysis] = useState({ industryTrends: '' });
    const [marketInsights, setMarketInsights] = useState(null);

    useEffect(() => {
        // Fetch data and update state
        // Example:
        // setSearchResults(fetchedData);
        // setSearchAnalysis(fetchedAnalysis);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Get search analysis and market insights in parallel
            const [analysisData, insightsData] = await Promise.all([
                openAIService.analyzeJobSearch(searchTerm),
                openAIService.getMarketInsights(searchTerm, location)
            ]);

            setSearchAnalysis(analysisData);
            setMarketInsights(insightsData);
        } catch (err) {
            setError('Failed to analyze job search. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold">AI-Enhanced Job Search</h2>
                </div>

                <form onSubmit={handleSearch} className="space-y-4 mb-8">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title/Keywords
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Software Engineer"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required
                                />
                                <Search className="absolute right-4 top-3.5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. New York, NY"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2 justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Brain className="w-5 h-5" />
                                Analyze Job Market
                            </>
                        )}
                    </button>
                </form>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}

                {searchAnalysis && marketInsights && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Brain className="w-5 h-5 text-purple-600" />
                                    <h3 className="text-lg font-semibold">Job Analysis</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Relevant Titles</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {searchAnalysis.relevantTitles.map((title, index) => (
                                                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                                                    {title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Required Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {searchAnalysis.requiredSkills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Salary Range</h4>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <DollarSign className="w-4 h-4" />
                                            <span>{searchAnalysis.salaryRange}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <h3 className="text-lg font-semibold">Career Path</h3>
                                </div>
                                <p className="text-gray-700">{searchAnalysis.careerPath}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Market Insights</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Market Demand</h4>
                                        <p className="text-gray-700">{marketInsights.demand}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Companies Hiring</h4>
                                        <p className="text-gray-700">{marketInsights.companies}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Remote Work</h4>
                                        <p className="text-gray-700">{marketInsights.remoteWork}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Competition Level</h4>
                                        <p className="text-gray-700">{marketInsights.competitionLevel}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Industry Trends</h3>
                                <p className="text-gray-700">{searchAnalysis.industryTrends}</p>
                            </div>
                        </div>
                    </div>
                )}

                        {/* Ensure searchResults is an array before mapping */}
                    </div>
                </div>
            );
        };
    

export default JobSearch;