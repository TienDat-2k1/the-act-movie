import axios from 'axios';
import { API_URL } from './contants';

const httpRequest = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export default httpRequest;
