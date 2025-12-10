import React from "react";

const BookAdditionalInfo = ({ book }) => {
  const productInfo = [
    { label: "Availability", value: book.status },
    { label: "Categories", value: book.category },
    { label: "Publish Date", value: book.publishedDate },
    { label: "Total Page", value: book.pages },
    { label: "Price", value: book.price },
    { label: "Library Location", value: book.libraryLocation },
    { label: "Language", value: book.language },
    { label: "Added to Library", value: book.addedToLibraryDate },
    { label: "Shelf Number", value: book.shelfNumber },
  ];
  return (
    <div className="bg-white">
      <table className="w-full border-collapse">
        <tbody>
          {productInfo.map((item, index) => (
            <tr key={index} className="border border-gray-200">
              <td className="py-4 px-6 font-medium text-gray-700 bg-gray-50 border-r border-gray-200 w-48">
                {item.label}
              </td>
              <td className="py-4 px-6 text-gray-600">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookAdditionalInfo;
