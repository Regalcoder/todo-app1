const TestError = () => {
  // Throw error without returning anything
  throw new Error('This is a test error to trigger the error boundary.');
  
  // Remove the unreachable return statement completely
};

export default TestError;