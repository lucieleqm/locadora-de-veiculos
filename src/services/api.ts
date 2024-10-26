import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.48:3001', // URL do back-end
});

export const getVeiculos = async () => {
  try {
    const response = await api.get('/veiculos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    throw error;
  }
};
