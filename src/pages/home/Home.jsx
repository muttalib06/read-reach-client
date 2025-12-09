import React from 'react';
import Banner from '../../components/home/banner/Banner';
import LatestBook from '../../components/home/LatestBook/LatestBook';
import CoverageArea from '../../components/home/coverageArea/CoverageArea';
import WhyChooseUs from '../../components/home/whyChoose/WhyChooseUs';
import HowItWorks from '../../components/home/howItWork/HowItWorks';
import Testimonial from '../../components/home/testimonials/Testimonial';
import Stats from '../../components/home/stats/Stats';

const Home = () => {
        return (
                <div>
                       {/* banner section */}
                       <Banner></Banner>

                       {/* Latest book section */}
                       <LatestBook></LatestBook>

                       {/* Coverage area where we serve our services */}
                       <CoverageArea></CoverageArea>  

                      {/* why choose us */}
                      <WhyChooseUs></WhyChooseUs>

                      {/* stats section */}
                     <Stats>d</Stats>

                      {/* How it Works */}
                      <HowItWorks></HowItWorks>
                      {/* Testimonial */}
                      <Testimonial></Testimonial>
                                              
                </div>
        );
};

export default Home;