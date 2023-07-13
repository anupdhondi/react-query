import { useState } from 'react';
import './App.css';

import { useQuery } from 'react-query';

function App() {
  const [repoName, setRepoName] = useState('');

  const { isLoading, data } = useQuery(['unique-key', repoName], () => {
    return fetch(`https://api.github.com/repos/${repoName}`).then((res) =>
      res.json()
    );
  });

  if (isLoading) {
    return (
      <div className="App">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        <input value={repoName} onChange={(e) => setRepoName(e.target.value)} />
        <h2>{data.name}</h2>
        <h2>{data.description}</h2>
        <h2>{data.stargazers_count}</h2>
      </div>
    </div>
  );
}

export default App;
