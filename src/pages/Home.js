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
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [input, setInput] = useState('');

  // Load paginated todos
  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPaginatedTodos(currentPage);
        setTodos(data);
        
        // Get total count for pagination
        const allTodos = await fetchTodos();
        setTotalPages(Math.ceil(allTodos.length / 10));
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, [currentPage]);

  // Create new todo
  const handleCreate = async () => {
    if (!input.trim()) return;
    setIsCreating(true);
    try {
      const newTodo = { title: input, completed: false };
      const createdTodo = await createTodo(newTodo);
      setTodos(prev => [createdTodo, ...prev]);
      setInput('');
    } catch (error) {
      console.error('Create failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  // Skeleton loader for todos
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, index) => (
      <li key={`skeleton-${index}`} className="todo-item">
        <div className="todo-content">
          <div className="skeleton-loader" style={{ width: '100%', height: '20px' }}></div>
        </div>
      </li>
    ));
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Todo App</h1>
        <Link to="/test-error" className="test-error-link">
          Test Error Boundary
        </Link>
      </header>

      {/* Add Todo Form */}
      <div className="todo-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
          disabled={isCreating}
        />
        <button 
          onClick={handleCreate}
          disabled={isCreating || !input.trim()}
        >
          {isCreating ? 'Adding...' : 'Add Todo'}
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {isLoading && renderSkeletons()}
        {!isLoading && todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <Link to={`/todos/${todo.id}`} className="todo-content">
              <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                {todo.title}
              </span>
              <span className="todo-status">
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </Link>
            <div className="todo-actions">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(todo.id);
                }}
                disabled={isDeleting === todo.id}
              >
                {isDeleting === todo.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          
          <span>Page {currentPage} of {totalPages}</span>
          
          <button 
            disabled={currentPage === totalPages || isLoading}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Full-page loading overlay */}
      {(isLoading && currentPage === 1) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}