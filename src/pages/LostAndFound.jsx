import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const LostAndFound = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("desc");
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

    const handleSort = (event) => {
        const order = event.target.value;
        const sortedItems = [...filteredItems].sort((a, b) => {
            return order === "asc"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        });
        setFilteredItems(sortedItems);
        setSortOrder(order);
    };

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
                <title>Lost and Found Items | WhereIsIt</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Lost & Found Items</h1>

            {/* Search Bar & Sort Dropdown */}
            <div className="flex flex-col md:flex-row md:justify-between items-end mb-6">
                <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-2/3 border rounded-lg p-3 shadow-md bg-light_bg dark:bg-dark_bg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    onChange={handleSort}
                    value={sortOrder}
                    className="mt-4 md:mt-0 border rounded-lg p-2 bg-white dark:bg-dark_bg dark:text-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="desc">Sort by Date: Descending</option>
                    <option value="asc">Sort by Date: Ascending</option>
                </select>
            </div>

            {filteredItems.length === 0 ? (
                <p className="text-center text-gray-500">No items found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-dark_bg dark:border dark:border-gray-700 shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={item.thumbnail || "https://via.placeholder.com/150"}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">{item.title}</h2>
                            <p className="text-gray-700 mb-2 dark:text-gray-100">Location: {item.location}</p>
                            <p className="text-gray-500 mb-2 dark:text-gray-100">Type: {item.type}</p>
                            <p className="text-gray-500 mb-4 dark:text-gray-100">Date: {item.date}</p>

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
