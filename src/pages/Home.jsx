import React from 'react';
import Banner from '../components/Banner';
import FindLostItemsSection from '../components/FindLostItemsSection';
import { Helmet } from 'react-helmet';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import LostFoundTips from '../components/LostFoundTips';

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
            <LostFoundTips></LostFoundTips> 
        </div>
    );
};

export default Home;