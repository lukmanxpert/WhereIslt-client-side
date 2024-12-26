// ManageMyItemsPage.jsx
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const ManageMyItems = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_serverUrl}/my-items/${user.email}`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
            });
    }, []);

    console.log(items);

    return (
        <div className="p-6 md:p-8 lg:p-12 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-6">Manage My Items</h1>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">You have not added any items yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">Title</th>
                                <th className="border border-gray-200 px-4 py-2">Category</th>
                                <th className="border border-gray-200 px-4 py-2">Location</th>
                                <th className="border border-gray-200 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.category}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.location}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                                Update
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMyItems;
