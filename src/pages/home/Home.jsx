import React from 'react';
import Banner from '../../components/home/banner/Banner';
import LatestBook from '../../components/home/LatestBook/LatestBook';

const Home = () => {
        return (
                <div>
                       {/* banner section */}
                       <Banner></Banner>

                       {/* Latest book section */}
                       <LatestBook></LatestBook>
                   
                        
                </div>
        );
};

export default Home;