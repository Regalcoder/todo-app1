import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  fetchTodos,
  fetchPaginatedTodos,
  createTodo,
  deleteTodo
} from '../services/api';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  // Load paginated todos
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        // Fetch current page data
        const data = await fetchPaginatedTodos(currentPage);
        setTodos(data);
        
        // Get total count for pagination (mock API workaround)
        const allTodos = await fetchTodos();
        setTotalPages(Math.ceil(allTodos.length / 10));
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [currentPage]);

  // Create new todo
  const handleCreate = async () => {
    if (!input.trim()) return;
    try {
      const newTodo = { title: input, completed: false };
      const createdTodo = await createTodo(newTodo);
      setTodos(prev => [...prev, createdTodo]);
      setInput('');
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return <div className="loading">Loading todos...</div>;

  return (
    <div className="home-container">
      <h1>Todo List</h1>
      
      {/* Add Todo Form */}
      <div className="todo-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
        />
        <button onClick={handleCreate}>Add Todo</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`} className="todo-link">
              <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                {todo.title}
              </span>
              <span className="todo-status">
                {todo.completed ? '✅ Completed' : '🟡 Pending'}
              </span>
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleDelete(todo.id);
              }}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}