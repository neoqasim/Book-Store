import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [yearPublished, setyearPublished] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3006/books/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setyearPublished(res.data.yearPublished);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    const handleEditBook = () => {
        const data = {
            title,
            author,
            yearPublished,
        };
        setLoading(true);
        axios
            .put(`http://localhost:3006/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                alert("please check console see the console");
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
                    setLoading(false);
                }
            });
    };
    return (
        <>
            <div className="p-4">
                <BackButton />
                <h1 className="text-3xl my-4">Edit Book</h1>
                {loading ? <Spinner /> : ""}
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="enter title here"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">
                            author
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="enter author here"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">
                            publish Year
                        </label>
                        <input
                            type="text"
                            value={yearPublished}
                            onChange={(e) => setyearPublished(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="enter yearPublished here"
                        />
                    </div>
                    <button
                        className="p-2 bg-sky-300 m-8"
                        onClick={handleEditBook}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditBook;
