import { useState } from 'react';
import './App.css';

import { useQuery } from 'react-query';

//1. If the component is unmounted then the query will be in inactive state
//2. As the component mounts it fetches the query and goes into state
//3. Even if the app window/ browser tab is out focused and then in focused then als it will fetch and goes to stale

function Button() {
  const { isLoading, isError, data, error } = useQuery('unique-key', () => {
    return new Promise((res, rej) => {
      setTimeout(() => res(Math.random()), 1000);
    });
  });
  return <button>Submit {data}</button>;
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      {show && <Button />}
      <br />
      <button onClick={() => setShow(!show)}>toggle</button>
    </div>
  );
}

export default App;
