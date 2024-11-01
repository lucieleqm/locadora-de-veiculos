import { API_URL } from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL:'http://192.168.1.48:3001'
});

export default api;

