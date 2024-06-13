import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState('');

  const onClick = () => {
    setData('data');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onClick}>Click</button>
        {data && <p>{data}</p>}
      </header>
    </div>
  );
}

export default App;
