import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  fetchTodos,
  fetchPaginatedTodos,
  createTodo,
  deleteTodo
} from '../services/api';

export default function Home() {
  const [allTodos, setAllTodos] = useState([]);
  const [displayedTodos, setDisplayedTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  // Load paginated todos
  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPaginatedTodos(currentPage);
        setAllTodos(data);
        
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

  // Filter todos based on search and status
  useEffect(() => {
    const filtered = allTodos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'completed' && todo.completed) || 
        (statusFilter === 'incomplete' && !todo.completed);
      
      return matchesSearch && matchesStatus;
    });
    setDisplayedTodos(filtered);
  }, [allTodos, searchTerm, statusFilter]);

  // Create new todo
  const handleCreate = async () => {
    if (!input.trim()) return;
    setIsCreating(true);
    try {
      const newTodo = { title: input, completed: false };
      const createdTodo = await createTodo(newTodo);
      setAllTodos(prev => [createdTodo, ...prev]);
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
      setAllTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  // Toggle todo status
  const handleToggleStatus = async (id) => {
    try {
      const todoToUpdate = allTodos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await updatedTodo(id, updatedTodo);
      setAllTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // Skeleton loader
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

      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-controls">
          <label>
            <input
              type="radio"
              name="status"
              checked={statusFilter === 'all'}
              onChange={() => setStatusFilter('all')}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="status"
              checked={statusFilter === 'completed'}
              onChange={() => setStatusFilter('completed')}
            />
            Completed
          </label>
          <label>
            <input
              type="radio"
              name="status"
              checked={statusFilter === 'incomplete'}
              onChange={() => setStatusFilter('incomplete')}
            />
            Incomplete
          </label>
        </div>
      </div>

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
        {!isLoading && displayedTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleStatus(todo.id)}
                className="status-checkbox"
              />
              <Link to={`/todos/${todo.id}`} className="todo-link">
                <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                  {todo.title}
                </span>
              </Link>
            </div>
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
        {!isLoading && displayedTodos.length === 0 && (
          <li className="no-results">No todos found matching your criteria</li>
        )}
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

      {/* Loading overlay */}
      {(isLoading && currentPage === 1) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}