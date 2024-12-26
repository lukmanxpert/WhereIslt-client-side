import React from 'react';
import Banner from '../components/Banner';
import FindLostItemsSection from '../components/FindLostItemsSection';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | WhereIslt</title>
            </Helmet>
            <Banner></Banner>
            <FindLostItemsSection></FindLostItemsSection>
        </div>
    );
};

export default Home;