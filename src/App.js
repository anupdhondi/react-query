import { useState } from 'react';
import './App.css';

import { useQuery } from 'react-query';

function App() {
  const [show, setShow] = useState(false);

  const { isIdle } = useQuery(
    ['unique-key', show],
    () => {
      return new Promise((res, rej) => {
        setTimeout(() => res(Math.random()), 1000);
      });
    },
    {
      enabled: show,
    }
  );
  console.log(
    '🚀 ~ file: App.js:16 ~ const{isIdle}=useQuery ~ isIdle:',
    isIdle
  );

  return (
    <div className="App">
      <br />
      <button onClick={() => setShow(!show)}>toggle</button>
    </div>
  );
}

export default App;
