import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodo } from '../services/api';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        console.log(`Fetching todo #${id}...`);
        const data = await fetchTodo(id);
        setTodo(data);
      } catch (error) {
        console.error('Failed to load todo:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTodo();
  }, [id]);

  if (loading) return <div className="loading">Loading todo details...</div>;
  if (!todo) return <div className="error">Todo not found</div>;

  return (
    <div className="detail-container">
      <button 
        onClick={() => navigate(-1)} // Go back to previous page
        className="back-button"
      >
        ← Back to List
      </button>

      <div className="todo-card">
        <h2 className={todo.completed ? 'completed' : ''}>
          {todo.title}
        </h2>
        
        <div className="metadata">
          <p><strong>ID:</strong> {todo.id}</p>
          <p><strong>Status:</strong> 
            <span className={todo.completed ? 'completed' : 'pending'}>
              {todo.completed ? ' Completed' : ' Pending'}
            </span>
          </p>
          {todo.userId && <p><strong>User ID:</strong> {todo.userId}</p>}
          {todo.createdAt && <p><strong>Created:</strong> {new Date(todo.createdAt).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
}