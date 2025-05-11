import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const AddLostAndFoundItems = () => {
    const { user } = useContext(AuthContext);

    // Initialize the formData state
    const initialFormData = {
        type: "Lost",
        thumbnail: "",
        title: "",
        description: "",
        category: "",
        location: "",
        date: "",
        contactInfo: {
            name: user?.displayName || "",
            email: user?.email || "",
        },
        recovered: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_serverUrl}/posts`, formData)
            .then((response) => {
                console.log(response.data);

                // Reset the form data
                setFormData(initialFormData);

                toast.success("Post added successfully");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to add the post");
            });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-dark_bg shadow-md rounded-lg">
            <Helmet>
                <title>Add Lost and Found Items | WhereIslt</title>
            </Helmet>
            <h1 className="text-2xl md:text-3xl text-black font-bold text-center mb-6 dark:text-white">
                Add Lost or Found Item
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Post Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                {/* Thumbnail (Image URL) */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Thumbnail (Image URL)</label>
                    <input
                        type="url"
                        name="thumbnail"
                        required
                        value={formData.thumbnail}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="w-full dark:bg-dark_bg bg-white dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter item title"
                        className="w-full bg-white dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Description</label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter item description"
                        className="w-full bg-white dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                        rows="4"
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Category</label>
                    <input
                        type="text"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g., Electronics, Documents"
                        className="w-full bg-white dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter the location"
                        className="w-full bg-white dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Contact Info */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-white">Contact Information</label>
                    <input
                        type="text"
                        name="contactInfo.name"
                        value={formData.contactInfo.name}
                        readOnly
                        className="w-full dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
                    />
                    <input
                        type="email"
                        name="contactInfo.email"
                        value={formData.contactInfo.email}
                        readOnly
                        className="w-full dark:bg-dark_bg dark:text-white border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600 mt-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddLostAndFoundItems;
