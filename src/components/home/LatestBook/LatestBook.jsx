import React from "react";
import Book from "../../sharedComponents/book/Book";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../sharedComponents/spinner/Spinner";
import ServerError from "../../sharedComponents/Error/ServerError";

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
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <ServerError code={error.status}></ServerError>;
  }
  return (
    <div className="mt-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
          Latest Arrivals
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
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
