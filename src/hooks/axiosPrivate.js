import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
const axiosPrivate = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosPrivate.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axiosPrivate.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.status === 400 || error.status === 401) {
          signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosPrivate;
};

// Add a request interceptor

export default useAxiosPrivate;
