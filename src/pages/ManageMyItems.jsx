// ManageMyItemsPage.jsx
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

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

    const handleDelete = (id) => {
        toast(
            (t) => (
                <span className="flex gap-2 items-center">
                    <p>Are you sure?</p>
                    <div className="flex gap-2">
                        <button className="text-green-600 font-bold hover:shadow-lg" onClick={() => toast.dismiss(t.id)}>Dismiss</button>
                        <button className="text-red-600 font-bold hover:shadow-lg" onClick={() => {
                            axios.delete(`${import.meta.env.VITE_serverUrl}/delete-item/${id}`)
                                .then((response) => {
                                    console.log(response.data);
                                    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
                                    toast.success("Item deleted successfully");
                                })
                                .catch((error) => {
                                    console.error("Error deleting item:", error);
                                });
                            toast.dismiss(t.id);
                        }}>Delete</button>
                    </div>
                </span >
            )
        );
    };

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
                                            <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
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
