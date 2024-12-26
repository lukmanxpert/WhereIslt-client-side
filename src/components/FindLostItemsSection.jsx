import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FindLostItemsSection = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_serverUrl}/latest-posts`)
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);
    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                Latest Find & Lost Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    items.length === 0 && (
                        <div className="text-center col-span-3">
                            <p className="text-lg">No items found</p>
                        </div>
                    )
                }
                {items.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold truncate">{item.title}</h3>
                            <p className="text-sm text-gray-600 truncate">{item.description.substring(0, 20)}...</p>
                            <p className="text-xs text-gray-500 mt-2 mb-4">
                                {new Date(item.date).toLocaleDateString()}
                            </p>
                            <Link to={`/details/${item._id}`} className="mt-4 px-4 py-2 bg-transparent hover:scale-105 text-[#FF9800] font-bold rounded-md border-2 border-[#FF9800] transition">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <Link to="/lost-and-found-items" className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition">
                    See All
                </Link>
            </div>
        </div>
    );
};

export default FindLostItemsSection;
