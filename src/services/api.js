import axios from 'axios';
import localforage from 'localforage';

const api = axios.create({
  baseURL: 'https://api.oluwasetemi.dev', // THIS WAS MISSING
  timeout: 5000
});

export const fetchTodos = async () => {
  console.log('[API] Attempting to fetch todos...');
  try {
    const response = await api.get('/todos');
    console.log('[API] Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Failed:', error);
    return [];
  }
};