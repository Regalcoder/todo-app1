import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Debugging wrapper
const request = async (method, endpoint, data = null) => {
  console.log(`[API] ${method.toUpperCase()} ${endpoint}`, data || '');
  try {
    const response = await api({ method, url: endpoint, data });
    console.log('[API] Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error:', error.message);
    throw error;
  }
};

// CRUD + Pagination
export const fetchTodos = () => request('get', '/todos');
export const fetchTodo = (id) => request('get', `/todos/${id}`);
export const fetchPaginatedTodos = (page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  return request('get', `/todos?_start=${start}&_limit=${limit}`);
};
export const createTodo = (todo) => request('post', '/todos', todo);
export const updateTodo = (id, todo) => request('put', `/todos/${id}`, todo);
export const deleteTodo = (id) => request('delete', `/todos/${id}`);