import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/axiosPrivate";

const PostDetailsPage = () => {
  const axiosPrivate = useAxiosPrivate()
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [item, setItem] = useState([]);
  const [isRecovered, setIsRecovered] = useState("false");
  console.log(item.recovered);
  console.log(isRecovered);
  const { id } = useParams();

  useEffect(() => {
    axiosPrivate(`/posts/${id}`)
      .then((data) => {
        setItem(data.data);
        console.log(data.data);
        setIsRecovered(data.data.recovered);
      });
  }, [id]);

  // useEffect(async () => {
  //   const result = await axiosPrivate.get(`/posts/${id}`)
  //     .then((data) => setItem(data.data))
  //     .catch((error) => console.log(error))
  //   console.log(result);
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const recoveredLocation = e.target.recoveredLocation.value;
    const recoveredDate = date;
    axios.post(`${import.meta.env.VITE_serverUrl}/recovered-item`, {
      recoveredLocation,
      recoveredDate,
      itemId: item?._id,
      userEmail: user?.email,
      userName: user?.displayName,
    })
      .then((response) => {
        console.log(response.data);
        const updateData = {
          recovered: true
        };
        axios.put(`${import.meta.env.VITE_serverUrl}/update-recovered-item/${item?._id}`, updateData)
          .then((response) => {
            console.log(response.data);
            toast.success('Item recovery information submitted successfully');
            setIsRecovered(true);
            document.getElementById('my_modal_4').close();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h1 className="text-3xl text-black dark:text-white md:text-4xl font-bold text-center mb-6">
        {item?.title}
      </h1>
      <div className="w-full h-72 md:h-96 lg:h-[500px] mb-8">
        <img
          src={item?.thumbnail}
          alt={item?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-6 px-4 lg:px-16">
        <div>
          <h2 className="text-xl dark:text-white font-semibold text-gray-800 mb-2">
            Type
          </h2>
          <p className="text-gray-700 dark:text-slate-300">{item?.type}</p>
        </div>
        <div>
          <h2 className="text-xl dark:text-white font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 dark:text-slate-300">{item?.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-2">
            Category
          </h2>
          <p className="text-gray-700 dark:text-slate-300">{item?.category}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-2">
            Location
          </h2>
          <p className="text-gray-700 dark:text-slate-300">{item?.location}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-2">Date</h2>
          <p className="text-gray-700 dark:text-slate-300">{new Date(item?.date).toLocaleDateString()}</p>
        </div>
        <div>
          <h2 className="text-xl dark:text-white font-semibold text-gray-800 mb-2">
            Contact Information
          </h2>
          <p className="text-gray-700 dark:text-slate-300">
            <strong>Name:</strong> {item?.contactInfo?.name}
          </p>
          <p className="text-gray-700 dark:text-slate-300">
            <strong>Email:</strong> {item?.contactInfo?.email}
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        {item?.type === "Lost" ? (
          <button disabled={isRecovered == true} onClick={() => document.getElementById('my_modal_4').showModal()} className={`px-8 py-3 ${isRecovered == true ? 'bg-gray-300 hover:bg-gray-300' : 'bg-blue-500'} text-white font-bold rounded-md hover:bg-blue-600 transition`}>
            {isRecovered == true ? 'Already Recovered' : 'Found This!'}
          </button>
        ) : (
          <button disabled={isRecovered == true} onClick={() => document.getElementById('my_modal_4').showModal()} className={`px-8 py-3 ${isRecovered == true ? 'bg-gray-300 hover:bg-gray-300' : 'bg-blue-500'} text-white font-bold rounded-md hover:bg-blue-600 transition`}>
            {isRecovered == true ? 'Already Recovered' : 'This is Mine'}
          </button>
        )}
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-slate-100 dark:bg-slate-900">
          {/* Modal Header */}
          <h3 className="font-bold text-2xl text-gray-800 dark:text-white">Item Recovery Information</h3>
          <p className="text-sm text-gray-500 mt-1 dark:text-slate-200">Please provide the details below to proceed.</p>

          {/* Modal Content */}
          <form onSubmit={handleSubmit} method="dialog" className="py-4 space-y-6">
            {/* Item Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">Item Details</h4>
              <p className="text-gray-600 dark:text-slate-200">
                <strong>Title:</strong> {item?.title}
              </p>
              <p className="text-gray-600 dark:text-slate-200">
                <strong>Category:</strong> {item?.category}
              </p>
              <p className="text-gray-600 dark:text-slate-200">
                <strong>Location:</strong> {item?.location}
              </p>
            </div>

            {/* Recovery Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">Recovery Information</h4>
              <label className="block text-gray-700 font-medium mb-1 dark:text-slate-200">Recovered Location</label>
              <input
                type="text"
                name="recoveredLocation"
                placeholder="Enter the location"
                required
                className="w-full border-2 dark:bg-slate-900 bg-slate-100 outline-none rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-medium mt-4 mb-1 dark:text-slate-200">Recovered Date</label>
              <DatePicker
                className='border-2 dark:bg-slate-900 p-2 bg-slate-100 rounded-md'
                selected={date}
                onChange={date => setDate(date)}
              />
            </div>

            {/* User Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 dark:text-slate-200">Your Information</h4>
              <p className="text-gray-600 dark:text-slate-200">
                <strong>Name:</strong> {user?.displayName}
              </p>
              <p className="text-gray-600 dark:text-slate-200">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                type="button"
                onClick={() => document.getElementById('my_modal_4').close()}
                className="btn bg-gray-300 text-gray-700 border-none hover:bg-gray-400 hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isRecovered == true}
                className={`btn text-[#FF9800] border-2 border-[#FF9800] bg-transparent hover:bg-transparent hover:border-[#FF9800] hover:scale-105`}
              >
                {isRecovered == true ? 'Already Recovered' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </dialog>


    </div>
  );
};

export default PostDetailsPage;
