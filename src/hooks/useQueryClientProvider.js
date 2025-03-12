// withQueryClientProvider.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Higher-Order Component (HOC) to wrap a component with QueryClientProvider
const withQueryClientProvider = (Component) => (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
    </QueryClientProvider>
  );
};

export default withQueryClientProvider;
