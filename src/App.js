import { useState } from 'react';
import './App.css';

import { useMutation, useQuery } from 'react-query';
import Post from './Post';
import client from './react-query-client';

const fetcher = (url) => fetch(url).then((res) => res.json());
const timer = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('In Promise');
      resolve();
    }, duration);
  });
};
function App() {
  const mutation = useMutation(() => timer(1000));

  const mutationClicked = async () => {
    console.log('Callling Mutation');
    await mutation.mutateAsync();
    console.log('Done...');
  };

  return (
    <div className="App">
      <p>Mutations</p>
      <button onClick={mutationClicked}>Submit</button>
    </div>
  );
}

export default App;
