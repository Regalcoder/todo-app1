import { useState } from 'react';

const TodoCard = ({ todo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="todo-card">
      <h3 className="todo-title">{todo.title}</h3>
      <span className={`todo-status ${todo.completed ? 'completed' : ''}`}>
        {todo.completed ? 'Completed' : 'Incomplete'}
      </span>
      
      {todo.description && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-button"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      )}
      
      {isExpanded && todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}
    </div>
  );
};

export default TodoCard;