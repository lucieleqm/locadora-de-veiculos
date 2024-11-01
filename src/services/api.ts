import { API_URL } from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL:'http:// ip aqui:3001'
});

export default api;

