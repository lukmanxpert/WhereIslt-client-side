import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

const useAxiosPrivate = () => {
  return axiosPrivate;
};

export default useAxiosPrivate;