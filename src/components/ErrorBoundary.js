import { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleTryAgain = () => {
    setHasError(false);
    window.location.href = '/';
  };

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong.</h2>
        <button onClick={handleTryAgain}>Go back to home</button>
      </div>
    );
  }

  return children;
};

// Change from named export to default export
export default ErrorBoundary;