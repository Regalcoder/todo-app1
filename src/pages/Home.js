import { useEffect, useState } from 'react';
import { fetchTodos } from '../services/api';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🟡 Component mounted - fetching data');
    const loadData = async () => {
      try {
        console.log('🟡 Calling API...');
        const data = await fetchTodos();
        console.log('🟢 API Response:', data);
        setTodos(data);
      } catch (error) {
        console.error('🔴 API Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData(); 
  }, []);

  if (loading) return <div>Loading todos...</div>;
  if (!todos.length) return <div>No todos found</div>;

  return (
    <div>
      <h1>Your Todos</h1>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}