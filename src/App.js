import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoDetail from './pages/TodoDetails';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;