import React, { act, useState } from "react";
import BookDes from "./bookInfo/BookDes";
import BookAdditionalInfo from "./bookInfo/BookAdditionalInfo";
import BookReview from "./bookInfo/BookReview";

const BookDetailTap = ({ book }) => {
  const [activeTap, setActiveTap] = useState(0);
  const tabs = [
    { label: "Description" },
    { label: "Additional Information" },
    { label: "Reviews" },
  ];

  const tabContent = [
    // Description
    <BookDes book={book}></BookDes>,
    // Additional Information
    <BookAdditionalInfo book={book}></BookAdditionalInfo>,
    // Reviews
    <BookReview book={book}></BookReview>,
  ];
  return (

      <div className="max-w-7xl mx-auto p-8 bg-gray-50">
        {/* Taps Navigation */}
       <div className="flex justify-center items-center border-b-2 border-gray-200">
         <div className="flex gap-8 ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTap(index)}
              className={`pb-4 px-2 font-medium text-base transition-all relative ${
                activeTap === index
                  ? "text-primary"
                  : "text-gray-700 hover:text-orange-400"
              }`}
            >
              {tab.label}

              {activeTap === index && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></span>
              )}
            </button>
          ))}
        </div>
       </div>

        {/* tab content */}

        <div className="mt-12 bg-white p-8 rounded-lg">
          {tabContent[activeTap]}
        </div>
      </div>

  );
};

export default BookDetailTap;
