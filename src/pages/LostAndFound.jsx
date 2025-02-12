import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const LostAndFound = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_serverUrl}/posts`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setFilteredItems(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = items.filter(
            (item) =>
                item.title.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
    }, [searchQuery, items]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-light_bg dark:bg-dark_bg md:p-8 lg:p-12">
            <Helmet>
                <title>Lost and Found Items | WhereIslt</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Lost & Found Items</h1>

            {/* Search Bar */}
            <div className="mb-6 bg-light_bg dark:bg-dark_bg">
                <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border rounded-lg p-3 shadow-md bg-light_bg dark:bg-dark_bg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {filteredItems.length === 0 ? (
                <p className="text-center text-gray-500">No items found.</p>
            ) : (
                <div className="grid grid-cols-1 bg-light_bg dark:bg-dark_bg sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-dark_bg shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={item.thumbnail || "https://via.placeholder.com/150"}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h2>
                            <p className="text-gray-700 mb-2 dark:text-gray-100">Location: {item.location}</p>
                            <p className="text-gray-500 mb-4 dark:text-gray-100">Type: {item.type}</p>

                            <Link
                                to={`${user ? `/details/${item._id}` : "/login"}`}
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
