import axios_ from 'axios';
import env from '../utils/env.mjs';

const axiosInstance = axios_.create({
  baseURL: env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axios = async (url, options = {}) => {
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    const err = new Error(error.response?.data?.message || 'Error fetching data');
    err.cause = error.response?.data?.message;
    err.original = error.response?.data;
    throw err;
  }
};

axios.delete = function (url) {
  return axios(url, {
    method: 'DELETE',
  });
};

axios.post = function (url, data) {
  return axios(url, {
    method: 'POST',
    data,
  });
};

axios.put = function (url, data) {
  return axios(url, {
    method: 'PUT',
    data,
  });
};

export default axios;
