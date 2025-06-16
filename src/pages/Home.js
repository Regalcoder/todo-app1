import { useState, useEffect } from 'react';
import { fetchTodos } from '../services/api';
import TodoList from '../components/TodoList';
import SearchFilter from '../components/SearchFilter';
import Loading from '../components/Loading';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

/*
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const testConnection = async () => {
    try {
      const response = await fetch('https://api.oluwasetemi.dev/todos');
      console.log('TEST RESPONSE:', await response.json());
    } catch (error) {
      console.error('CONNECTION FAILED:', error);
    }
  };
  testConnection();

    getTodos();

  }, []); */

  useEffect(() => {
  console.log("🟡 Component mounted - starting data load"); // Debug log A
  
  const getTodos = async () => {
  try {
    const response = await fetchTodos();
    console.log("API Response:", response);
    
    // Handle both array and object responses
    const todosData = Array.isArray(response) ? response : response?.data || [];
    setTodos(todosData);
    
  } catch (err) {
    console.error("Fetch error:", err);
  }
};
}, []);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && todo.completed) || 
      (filter === 'incomplete' && !todo.completed);
    
      console.log('DEBUG:', { todos, loading, error });
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="home-page">
      <h1>Todo List</h1>
      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />
      <TodoList 
        todos={currentTodos} 
        setTodos={setTodos} 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;