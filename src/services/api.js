import axios from 'axios';
import localforage from 'localforage';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
});

// Cache configuration
const cache = {
  get: (key) => localforage.getItem(key),
  set: (key, value) => localforage.setItem(key, value),
  remove: (key) => localforage.removeItem(key)
};

// 1. Fetch all todos
export const fetchTodos = async () => {
  try {
    const cached = await cache.get('todos');
    if (cached) return cached;

    const { data } = await api.get('/todos?_limit=10');
    await cache.set('todos', data);
    return data;
  } catch (error) {
    console.error('Fetch todos error:', error);
    return [];
  }
};

// 2. Fetch single todo
export const fetchTodo = async (id) => {
  try {
    const cacheKey = `todo-${id}`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const { data } = await api.get(`/todos/${id}`);
    await cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Fetch todo error:', error);
    return null;
  }
};

// 3. Create todo
export const createTodo = async (todo) => {
  try {
    const { data } = await api.post('/todos', todo);
    await cache.remove('todos'); // Invalidate cache
    return data;
  } catch (error) {
    console.error('Create todo error:', error);
    throw error;
  }
};

// 4. Update todo
export const updateTodo = async (id, todo) => {
  try {
    const { data } = await api.put(`/todos/${id}`, todo);
    await cache.remove('todos');
    await cache.remove(`todo-${id}`);
    return data;
  } catch (error) {
    console.error('Update todo error:', error);
    throw error;
  }
};

// 5. Delete todo
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
    await cache.remove('todos');
    await cache.remove(`todo-${id}`);
  } catch (error) {
    console.error('Delete todo error:', error);
    throw error;
  }
};