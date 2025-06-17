import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTodos } from '../services/api';
import Loading from '../components/Loading';

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const data = await fetchTodos(id);
        setTodo(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getTodo();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="todo-detail">
      <Link to="/" className="back-button">← Back to List</Link>
      <h1>{todo.title}</h1>
      <div className="todo-info">
        <p>Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
        <p>Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
        {todo.updatedAt && (
          <p>Last Updated: {new Date(todo.updatedAt).toLocaleDateString()}</p>
        )}
        {todo.description && (
          <div className="description">
            <h3>Description:</h3>
            <p>{todo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetail;