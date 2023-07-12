import './App.css';

import { useQuery } from 'react-query';

function App() {
  const { isLoading, isError, data, error } = useQuery('unique-key', () => {
    return new Promise((res, rej) => {
      rej(5);
    });
  });
  console.log(
    '🚀 ~ file: App.js:11 ~ const{data,error}=useQuery ~ data:',
    data,
    error
  );

  return <div className="App">asdsad</div>;
}

export default App;
