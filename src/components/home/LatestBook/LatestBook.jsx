import React from 'react';
import Book from '../../sharedComponents/book/Book';

const LatestBook = () => {
        return (
                <div>
                        <div className='my-8'>
                                <h2 className='font-bold text-3xl'>Latest Arrivals</h2>
                        </div>

                        {/* books section */}

                        <div>
                                <Book></Book>
                        </div>
                        
                </div>
        );
};

export default LatestBook;