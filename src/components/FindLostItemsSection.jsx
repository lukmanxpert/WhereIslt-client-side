import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";

const FindLostItemsSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_serverUrl}/latest-posts`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 dark:bg-dark_bg text-center">
                <p className="text-lg dark:text-white">Loading latest items...</p>
            </div>
        );
    }

    return (
        <motion.div
            className="p-6 mt-10 bg-gray-50 dark:bg-dark_bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl md:text-3xl text-black dark:text-white font-bold text-center mb-6">
                Latest Find & Lost Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    items.length === 0 ? (
                        <div className="text-center col-span-3">
                            <p className="text-lg">No items found</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <motion.div
                                key={item._id}
                                className="bg-white rounded-lg dark:bg-dark_bg shadow-md overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-black truncate dark:text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-600 truncate dark:text-gray-100">{item.description.substring(0, 20)}...</p>
                                    <p className="text-xs text-gray-500 mt-2 mb-4 dark:text-gray-100">
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>
                                    <Link to={`${user ? `/details/${item._id}` : '/login'}`} className="mt-4 px-4 py-2 bg-transparent hover:scale-105 text-[#FF9800] font-bold rounded-md border-2 border-[#FF9800] transition hover:bg-[#FF9800] hover:text-white">
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    )
                }
            </div>
            <div className="text-center pb-6 mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/lost-and-found-items" className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition">
                        See All
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FindLostItemsSection;
