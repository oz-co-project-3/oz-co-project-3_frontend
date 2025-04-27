import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL,
  withCredentials: true,
  // adapter: 'fetch',
});

export default axiosInstance;
