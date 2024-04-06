import { useEffect, useState } from 'react';
import './App.css';
import { Controls } from './Controls';
import { Results } from './Results';

function App() {
  const [result, setResult] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (rolling) {
      const timeout = setTimeout(() => {
        setRolling(false);
      }, 750);
      return () => clearTimeout(timeout);
    }
  }, [rolling])

  return (
    <div className="App">
      <Controls setResult={setResult} setRolling={setRolling}/>
      <Results results={result} rolling={rolling}/>
    </div>
  );
}

export default App;
