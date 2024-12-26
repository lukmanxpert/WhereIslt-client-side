import React from 'react';
import Banner from '../components/Banner';
import FindLostItemsSection from '../components/FindLostItemsSection';
import { Helmet } from 'react-helmet';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | WhereIslt</title>
            </Helmet>
            <Banner></Banner>
            <FindLostItemsSection></FindLostItemsSection>
            <Testimonials></Testimonials>
            <Statistics></Statistics>
        </div>
    );
};

export default Home;