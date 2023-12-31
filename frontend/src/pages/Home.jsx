// import React from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios
            .get("http://localhost:3006/books")
            .then((res) => {
                setBooks(res.data.data);
                setIsLoading(false);
            })

            .catch((error) => {
                // Handle the error here
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.log("Error response data:", error.response.data);
                    console.log("Status code:", error.response.status);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("Request was made but no response received");
                } else {
                    // Something else happened while setting up the request
                    console.log("Error:", error.message);
                    setIsLoading(false);
                }
            });
    }, []);

    return (
        <>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h1 className=" text-2xl my-8">Book list</h1>
                    <Link to="/books/create">
                        <MdOutlineAddBox />
                    </Link>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <table className="w-full border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th className="border border-slate-600 rounded-md">
                                    No
                                </th>
                                <th className="border border-slate-600 rounded-md">
                                    Title
                                </th>
                                <th className="border border-slate-600 rounded-md max-md:hidden">
                                    Author
                                </th>
                                <th className="border border-slate-600 rounded-md max-md:hidden">
                                    Publish year
                                </th>
                                <th className="border border-slate-600 rounded-md ">
                                    Opearations
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map((book, index) => (
                                <>
                                    <tr
                                        className="h-8 "
                                        key={book._id}>
                                        <td className="border border-slate-600 rounded-md text-center">
                                            {index + 1}{" "}
                                        </td>
                                        <td className="border border-slate-600 rounded-md text-center">
                                            {book.title}
                                        </td>
                                        <td className="border border-slate-600 rounded-md text-center">
                                            {book.author}
                                        </td>
                                        <td className="border border-slate-600 rounded-md text-center">
                                            {book.yearPublished}
                                        </td>
                                        <td>
                                            <div className="flex justify-centerborder border p-2 border-slate-600 rounded-md gap-x-4">
                                                <Link
                                                    to={`/books/details/${book._id}`}>
                                                    <BsInfoCircle className="text-yellow-700" />
                                                </Link>
                                                <Link
                                                    to={`/books/edit/${book._id}`}>
                                                    <AiOutlineEdit className="text-blue-700" />
                                                </Link>
                                                <Link
                                                    to={`/books/delete/${book._id}`}>
                                                    <AiFillDelete className="text-red-700" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Home;
