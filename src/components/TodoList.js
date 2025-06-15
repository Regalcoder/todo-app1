import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';
import Pagination from './Pagination';
import { deleteTodo } from '../services/api';

const TodoList = ({ todos, setTodos, currentPage, totalPages, setCurrentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="todo-list">
      <button 
        className="add-todo-button" 
        onClick={() => {
          setEditingTodo(null);
          setIsModalOpen(true);
        }}
      >
        Add New Todo
      </button>

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="todo-items">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <TodoCard todo={todo} />
              <div className="todo-actions">
                <Link to={`/todos/${todo.id}`} className="view-link">View</Link>
                <button onClick={() => handleEdit(todo)} className="edit-button">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(todo.id)} className="delete-button">
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isModalOpen && (
        <TodoForm 
          todo={editingTodo}
          onClose={() => setIsModalOpen(false)}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};

export default TodoList;