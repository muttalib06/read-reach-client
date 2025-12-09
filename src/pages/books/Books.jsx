import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import ServerError from "../../components/sharedComponents/Error/ServerError";
import Book from "../../components/sharedComponents/book/Book";
import { Pagination } from "@mui/material";

const Books = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all_books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0,0)

  },[])

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div className="h-screen">
        <ServerError code={error.status}></ServerError>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-16 mt-10">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
          All Available Books
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
      </div>

      {/* all books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          books.map(book =><Book key={book._id} book={book}></Book>)
        }
      </div>

      <div className="my-8 flex justify-center items-center">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default Books;
