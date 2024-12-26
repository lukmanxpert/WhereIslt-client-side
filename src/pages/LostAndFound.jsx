// LostAndFoundItemsPage.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const LostAndFound = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_serverUrl}/posts`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 lg:p-12">
            <Helmet>
                <title>Lost and Found Items | WhereIslt</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-6">Lost & Found Items</h1>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">No items found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={item.thumbnail || "https://via.placeholder.com/150"}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-700 mb-2">Location: {item.location}</p>
                            <p className="text-gray-500 mb-4">Type: {item.type}</p>

                            <Link
                                to={`/details/${item._id}`}
                                className="bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LostAndFound;
