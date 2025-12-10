import React, { useState } from "react";
import BookDes from "./bookInfo/BookDes";
import BookAdditionalInfo from "./bookInfo/BookAdditionalInfo";
import BookReview from "./bookInfo/BookReview";

const BookDetailTap = ({ book }) => {
  const [activeTap, setActiveTap] = useState(0);
  const [direction, setDirection] = useState(0);

  const tabs = [
    { label: "Description" },
    { label: "Additional Information" },
    { label: "Reviews" },
  ];

  const handleTabChange = (index) => {
    setDirection(index > activeTap ? 1 : -1);
    setActiveTap(index);
  };

  const tabContent = [
    // Description
    <BookDes book={book} key="description" />,
    // Additional Information
    <BookAdditionalInfo book={book} key="additional" />,
    // Reviews
    <BookReview book={book} key="reviews" />,
  ];

  return (
    <div className="bg-gray-50">
      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .slide-right {
          animation: slideInFromRight 0.4s ease-out;
        }
        
        .slide-left {
          animation: slideInFromLeft 0.4s ease-out;
        }
        
        .tab-button {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tab-button:hover {
          transform: translateY(-2px);
        }
        
        .tab-underline {
          animation: slideUnderline 0.3s ease-out;
          transform-origin: left;
        }
        
        @keyframes slideUnderline {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>

      {/* Tabs Navigation */}
      <div className="border-b-2 border-gray-200 overflow-x-auto">
        <div className="flex justify-center items-center min-w-max px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 md:gap-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`tab-button pb-3 sm:pb-4 px-2 sm:px-3 font-medium text-sm sm:text-base md:text-lg whitespace-nowrap ${
                  activeTap === index
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                <span className="inline-block">{tab.label}</span>
                {activeTap === index && (
                  <span className="tab-underline absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6 sm:mt-8 md:mt-12 w-full bg-white p-2 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
        <div
          key={activeTap}
          className={direction > 0 ? "slide-right" : "slide-left"}
        >
          {tabContent[activeTap]}
        </div>
      </div>
    </div>
  );
};

export default BookDetailTap;
