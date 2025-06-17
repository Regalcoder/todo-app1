import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Debug all requests
const request = async (method, endpoint, data = null) => {
  console.log(`[API] ${method.toUpperCase()} ${endpoint}`);
  try {
    const response = await api({ method, url: endpoint, data });
    console.log('[API] Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error:', error.message);
    throw error;
  }
};

// CRUD Operations
export const fetchTodos = () => request('get', '/todos?_limit=5');
export const createTodo = (todo) => request('post', '/todos', todo);
export const updateTodo = (id, todo) => request('put', `/todos/${id}`, todo);
export const deleteTodo = (id) => request('delete', `/todos/${id}`);