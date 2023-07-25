import { useState } from 'react';
import './App.css';

import { useMutation, useQuery } from 'react-query';
import Post from './Post';
import client from './react-query-client';

const fetcher = (url) => fetch(url).then((res) => res.json());
const timer = (duration, param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('🚀 ~ file: App.js:10 ~ timer ~ param:', param);
      if (Math.random() > 0.5) {
        resolve('Succefull');
      } else {
        reject('Rejected / Failed');
      }
    }, duration);
  });
};

function App() {
  const mutation = useMutation((param) => timer(1000, param), {
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

  const mutationClicked = () => {
    console.log('Callling Mutation');
    mutation.mutate('pass anything', {
      onError(error) {
        console.log('🚀 ~ file: App.js:39 ~ onError ~ error:', error);
      },
      onSuccess(data) {
        console.log('🚀 ~ file: App.js:43 ~ onSuccess ~ data:', data);
      },
      onSettled(data, error) {
        console.log('🚀 ~ file: App.js:47 ~ onSettled ~ error:', error);
        console.log('🚀 ~ file: App.js:47 ~ onSettled ~ data:', data);
      },
    });
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
