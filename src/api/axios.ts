import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  // adapter: 'fetch',
});

export default axiosInstance;
