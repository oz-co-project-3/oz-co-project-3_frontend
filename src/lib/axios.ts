import axios from 'axios';
import fetchAdapter from '@vespaiach/axios-fetch-adapter'

const axiosInstance = axios.create({
  adapter: fetchAdapter,
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default axiosInstance;
