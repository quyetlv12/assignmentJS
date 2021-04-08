import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:6767/api',
  headers: {
    'Content-Type': 'application/json',
  }
});