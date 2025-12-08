import React from "react";
import Book from "../../sharedComponents/book/Book";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LatestBook = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: books = [],
    error,
  } = useQuery({
    queryKey: ["latest_book"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-book");
      return res.data;
    },
  });
  console.log(books);
  return (
    <div>
      <div className="my-8">
        <h2 className="font-bold text-3xl">Latest Arrivals</h2>
      </div>

      {/* books section */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default LatestBook;
