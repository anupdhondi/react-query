import { QueryClient } from 'react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      cacheTime: 5000,
    },
  },
});

export default client;
