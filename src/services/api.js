import axios from 'axios';
import localforage from 'localforage';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Cache responses in localStorage
const cache = {
  get: async (key) => {
    try {
      return await localforage.getItem(key);
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },
  set: async (key, value) => {
    try {
      await localforage.setItem(key, value);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },
};

/*export const fetchTodos = async () => {
  const cacheKey = 'todos';
  const cachedData = await cache.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  const response = await api.get('/todos');
  await cache.set(cacheKey, response.data);
  return response.data;
}; */

/*export const fetchTodos = async () => {
  try {
    const response = await axios.get('/todos');
    console.log('API Response:', response.data); // Log actual data
    await localforage.setItem('todos', response.data);
    return response.data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return []; // Return empty array as fallback
  }
};  */

export const fetchTodos = async () => {
  try {
    console.log("🔵 Step 1: Checking cache..."); // Debug log 1
    const cached = await localforage.getItem('todos');
    
    if (cached) {
      console.log("🟢 Cache found:", cached); // Debug log 2
      return cached;
    }

    console.log("🔵 Step 2: Fetching fresh data..."); // Debug log 3
    const response = await axios.get('https://jsonplaceholder.typicode.com');
    console.log("🟢 API response:", response.data); // Debug log 4

    await localforage.setItem('todos', response.data);
    return response.data;
  } catch (error) {
    console.error("🔴 API Error:", error); // Debug log 5
    return [];
  }
};

/*
export const fetchTodos = async () => {
  try {
    // Step 1: First try to get cached data
    const cached = await localforage.getItem('todos');
    if (cached) return cached; // Use cache if exists
    
    // Step 2: If no cache, fetch fresh data
    const response = await axios.get('https://api.oluwasetemi.dev/todos');
    console.log("Fresh API Data:", response.data); // Debug log
    
    // Step 3: Save to cache and return
    await localforage.setItem('todos', response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return []; // Return empty array if failed
  }
}; */

export const fetchTodo = async (id) => {
  const cacheKey = `todo-${id}`;
  const cachedData = await cache.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  const response = await api.get(`/todos/${id}`);
  await cache.set(cacheKey, response.data);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post('/todos', todo);
  // Invalidate cache
  await localforage.removeItem('todos');
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/todos/${id}`, todo);
  // Invalidate relevant cache
  await localforage.removeItem('todos');
  await localforage.removeItem(`todo-${id}`);
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/todos/${id}`);
  // Invalidate relevant cache
  await localforage.removeItem('todos');
  await localforage.removeItem(`todo-${id}`);
};



// Temporary debug
localforage.getItem('todos').then(data => {
  console.log('CACHED TODOS:', data);
});