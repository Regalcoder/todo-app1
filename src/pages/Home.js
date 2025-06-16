import { useEffect, useState } from 'react';
import { fetchTodos } from '../services/api';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        console.log('[DEBUG] Fetching todos...'); // Add this
        const data = await fetchTodos();
        console.log('[DEBUG] Received:', data); // Add this
        setTodos(data);
      } catch (err) {
        setError(err.message);
        console.error('[DEBUG] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos(); // Actually call the function
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todos.length) return <div>No todos found</div>;

  return (
    <div>
      <h1>Todos</h1>
      <pre>{JSON.stringify(todos, null, 2)}</pre> {/* Temporary debug */}
    </div>
  );
}