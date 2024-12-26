import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet";

const AllRecoveredItems = () => {
    const { user } = useContext(AuthContext);
    const [recoveredItems, setRecoveredItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_serverUrl}/user-recovered-items/${user.email}`)
                .then((response) => {
                    setRecoveredItems(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching recovered items:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        );
    }
    console.log(recoveredItems);
    return (
        <div className="p-6 md:p-8 lg:p-12 min-h-screen bg-gray-50">
            <Helmet>
                <title>All Recovery Items | WhereIslt</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center mb-6">All Recovered Items</h1>

            {recoveredItems.length === 0 ? (
                <p className="text-center text-gray-500">
                    No recovered items found. Start reporting lost and found items!
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">Title</th>
                                <th className="border border-gray-200 px-4 py-2">Category</th>
                                <th className="border border-gray-200 px-4 py-2">Location</th>
                                <th className="border border-gray-200 px-4 py-2">Recovered Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recoveredItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.category}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.location}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {item.date}
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

export default AllRecoveredItems;
