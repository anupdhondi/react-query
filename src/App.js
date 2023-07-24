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
      select: (result) => result.slice(0, 5),
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
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
