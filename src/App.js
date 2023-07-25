import { useState } from 'react';
import './App.css';

import { useMutation, useQuery } from 'react-query';
import Post from './Post';
import client from './react-query-client';

const fetcher = (url) => fetch(url).then((res) => res.json());
const timer = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('succeeded');
      } else {
        reject('Rejected / Failed');
      }
    }, duration);
  });
};

function App() {
  const mutation = useMutation(() => timer(1000), {
    onSuccess(data) {
      console.log('🚀 ~ file: App.js:20 ~ onSuccess ~ data:', data);
    },
    onError(data) {
      console.log('🚀 ~ file: App.js:26 ~ onError ~ data:', data);
    },
    onSettled(data, error) {
      console.log('🚀 ~ file: App.js:29 ~ onSettled ~ error:', error);
      console.log('🚀 ~ file: App.js:29 ~ onSettled ~ data:', data);
    },
  });

  const mutationClicked = async () => {
    console.log('Callling Mutation');
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.log('🚀 ~ file: App.js:39 ~ mutationClicked ~ error:', error);
    }
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
