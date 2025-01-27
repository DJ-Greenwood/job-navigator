import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeatureCard from '../components/home/FeatureCard';
import Layout from '../components/layout/Layout';

const HomePage = () => {
    const hasLayout = true; // Replace this with your actual condition to check if the page has a layout

    if (hasLayout) {
        return (
            <>
                <HeroSection />
                <FeatureCard />
            </>
        );
    }

    return (
        <Layout>
            <HeroSection />
            <FeatureCard />
        </Layout>
    );
};

export default HomePage;