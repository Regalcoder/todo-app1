import { useEffect } from 'react';

export default function TestError() {
  useEffect(() => {
    // Throw error after render to avoid concurrent rendering issues
    throw new Error("This is a test error for ErrorBoundary");
  }, []);

  return null;
}