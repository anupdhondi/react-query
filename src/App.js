import { useState } from 'react';
import './App.css';

import { useQuery } from 'react-query';
import Post from './Post';
import client from './react-query-client';

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const [postID, setPostID] = useState(null);

  const { isLoading, data } = useQuery(
    ['posts'],
    () => fetcher(`https://jsonplaceholder.typicode.com/posts`),
    {
      staleTime: Infinity,
      cacheTime: 5000,
    }
  );

  const clearPostID = () => setPostID(null);

  if (postID) {
    return <Post postID={postID} clearPostID={clearPostID} />;
  }

  if (isLoading) {
    return (
      <div className="App">
        <h2>Loading...</h2>
      </div>
    );
  }

  function mutateTitle(id) {
    client.setQueryData(['post', id], (oldData) => {
      if (oldData) {
        return {
          ...oldData,
          title: 'I mutated it manually',
        };
      }
    });
  }

  return (
    <div className="App">
      <div>
        {/* <input value={repoName} onChange={(e) => setRepoName(e.target.value)} /> */}
        {data.map((el) => {
          const cachedPost = client.getQueryData(['post', el.id]);

          return (
            <p key={el.id}>
              {cachedPost ? '(Visited)' : ''}
              <a onClick={() => setPostID(el.id)} href="#">
                {el.id} - {el.title}
              </a>
              <button onClick={() => mutateTitle(el.id)}>mutate title</button>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
