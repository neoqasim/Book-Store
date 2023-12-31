import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
const ShowBook = () => {
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let id = useParams();
    // useEffect(() => {
    //     setIsLoading(true);
    //     axios
    //         .get(`http://localhost:3006/books/${id}`)
    //         .then((response) => {
    //             setBook(response.data.data);
    //             setIsLoading(false);
    //         })

    //         .catch((error) => {
    //             // Handle the error here
    //             if (error.response) {
    //                 // The request was made and the server responded with a status code
    //                 console.log("Error response data:", error.response.data);
    //                 console.log("Status code:", error.response.status);
    //             } else if (error.request) {
    //                 // The request was made but no response was received
    //                 console.log("Request was made but no response received");
    //             } else {
    //                 // Something else happened while setting up the request
    //                 console.log("Error:", error.message);
    //                 setIsLoading(false);
    //             }
    //         });
    // }, []);

    useEffect(() => {
        console.log("id:", id.id); // Check the value of id
        // console.log(id.book);
        setIsLoading(true);
        const bookId = id.id.toString();
        axios
            .get(`http://localhost:3006/books/${bookId}`) // Ensure id is a string
            .then((response) => {
                setBook(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("Error response data:", error.response.data);
            });
    }, [id]);

    return (
        <>
            <div className="p-4">
                <BackButton />
                <h1 className="text-3xl my-4">Show Books</h1>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col border-r-2 border-r-sky-400 rounded-lg w-fit p-4">
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500 ">
                                id
                            </span>
                            {/* <span>{toString()}</span> */}
                        </div>
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500 ">
                                title
                            </span>
                            <span>{book.title}</span>
                        </div>
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500 ">
                                author
                            </span>
                            <span>{book.author}</span>
                        </div>
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500 ">
                                yearPublished
                            </span>
                            <span>{book.yearPublished}</span>
                        </div>
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500 ">
                                yearPublished
                            </span>
                            <span>{book.yearPublished}</span>
                        </div>
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500 ">
                                Create Time{" "}
                            </span>
                            <span>{new Date(book.createdAt).toString()}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ShowBook;
