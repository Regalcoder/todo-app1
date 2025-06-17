import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundaryWrapper from './components/ErrorBoundary';
import Home from './pages/Home';
import TodoDetail from './pages/TodoDetails';
import TestError from './pages/TestError';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundaryWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
          <Route path="/test-error" element={<TestError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundaryWrapper>
    </BrowserRouter>
  );
}

// Update your index.js to use createRoot
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default App;