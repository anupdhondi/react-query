import { useState } from 'react';
import './App.css';

import { useMutation, useQuery } from 'react-query';
import client from './react-query-client';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function App() {
  const [lang, setLang] = useState('');

  const mutation = useMutation((param) => postData('/addLang', param), {
    onSuccess(data) {
      console.log('🚀 ~ file: App.js:20 ~ onSuccess ~ data:', data);
      client.invalidateQueries('favLangs');
    },
    onError(error) {
      console.log('🚀 ~ file: App.js:15 ~ onError ~ error:', error);
    },
  });

  const { data, isLoading, isError } = useQuery(
    'favLangs',
    () => fetch('/getLangs').then((res) => res.json()),
    {
      select: (data) => {
        return data.favLangs;
      },
    }
  );

  const mutationClicked = () => {
    mutation.mutate({ record: lang });
    setLang('');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p style={{ color: 'red' }}>Error Occured</p>;
  }

  return (
    <div className="App">
      <h1>My Favourite Languages</h1>
      <ul>
        {data.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
      <input value={lang} onChange={(e) => setLang(e.target.value)} />
      <button onClick={mutationClicked}>Submit</button>
    </div>
  );
}

export default App;
