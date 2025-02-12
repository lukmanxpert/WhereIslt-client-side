import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const ManageMyItems = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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
                        <button
                            className="text-green-600 font-bold hover:shadow-lg"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Dismiss
                        </button>
                        <button
                            className="text-red-600 font-bold hover:shadow-lg"
                            onClick={() => {
                                axios
                                    .delete(`${import.meta.env.VITE_serverUrl}/delete-item/${id}`)
                                    .then((response) => {
                                        console.log(response.data);
                                        setItems((prevItems) =>
                                            prevItems.filter((item) => item._id !== id)
                                        );
                                        toast.success("Item deleted successfully");
                                    })
                                    .catch((error) => {
                                        console.error("Error deleting item:", error);
                                    });
                                toast.dismiss(t.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </span>
            )
        );
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const thumbnail = form.thumbnail.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const date = form.date.value;

        const updatedItem = {
            title,
            thumbnail,
            description,
            category,
            location,
            date,
        };

        axios
            .put(
                `${import.meta.env.VITE_serverUrl}/update-item/${selectedItem._id}`,
                updatedItem
            )
            .then((response) => {
                console.log(response.data);
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item._id === selectedItem._id ? { ...item, ...updatedItem } : item
                    )
                );
                document.getElementById("my_modal_4").close();
                toast.success("Item updated successfully");
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
    };


    return (
        <div className="bg-light_bg dark:bg-dark_bg">
            <Helmet>
                <title>Manage My Items | WhereIslt</title>
            </Helmet>
            <div className="p-6 md:p-8 lg:p-12 min-h-screen bg-gray-50 dark:bg-dark_bg">
                <h1 className="text-3xl font-bold text-center dark:text-white mb-6">Manage My Items</h1>

                {items.length === 0 ? (
                    <p className="text-center text-gray-500">You have not added any items yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-dark_bg dark:text-white">
                                    <th className="border border-gray-200 dark:border-gray-950 px-4 py-2">Title</th>
                                    <th className="border border-gray-200 dark:border-gray-950 px-4 py-2">Category</th>
                                    <th className="border border-gray-200 dark:border-gray-950 px-4 py-2">Location</th>
                                    <th className="border border-gray-200 dark:border-gray-950 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                                        <td className="border border-gray-200 dark:border-gray-950 px-4 py-2">{item.title}</td>
                                        <td className="border border-gray-200 dark:border-gray-950 px-4 py-2">{item.category}</td>
                                        <td className="border border-gray-200 dark:border-gray-950 px-4 py-2">{item.location}</td>
                                        <td className="border border-gray-200 dark:border-gray-950 px-4 py-2">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        document.getElementById("my_modal_4").showModal();
                                                    }}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                >
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

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg mb-4">Update Item</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="py-4">
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={selectedItem?.title}
                                className="input input-bordered w-full mb-4"
                            />
                            <label className="block mb-2">Thumbnail</label>
                            <input
                                type="url"
                                name="thumbnail"
                                defaultValue={selectedItem?.thumbnail}
                                className="input input-bordered w-full mb-4"
                            />
                            <label className="block mb-2">Description</label>
                            <input
                                type="text"
                                name="description"
                                defaultValue={selectedItem?.description}
                                className="input input-bordered w-full mb-4"
                            />

                            <label className="block mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                defaultValue={selectedItem?.category}
                                className="input input-bordered w-full mb-4"
                            />

                            <label className="block mb-2">Location</label>
                            <input
                                type="text"
                                name="location"
                                defaultValue={selectedItem?.location}
                                className="input input-bordered w-full mb-4"
                            />
                            <label className="block mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                defaultValue={selectedItem?.date}
                                className="input input-bordered w-full mb-4"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById("my_modal_4").close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageMyItems;
