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
  const [error, setError] = useState(null);

  // Load paginated todos
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPaginatedTodos(currentPage);
        setTodos(data);
        
        // Get total count for pagination (mock API workaround)
        const allTodos = await fetchTodos();
        setTotalPages(Math.ceil(allTodos.length / 10));
      } catch (err) {
        setError('Failed to load todos');
        console.error('Fetch error:', err);
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
    } catch (err) {
      setError('Failed to add todo');
      console.error('Create error:', err);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Delete error:', err);
    }
  };

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h1>Todo List</h1>
      
      {/* Test Error Boundary Link */}
      <nav>
        <Link to="/test-error" className="test-error-link">
          Test Error Boundary
        </Link>
      </nav>

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
      {totalPages > 1 && (
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
      )}
    </div>
  );
}