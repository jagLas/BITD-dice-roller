import { useEffect, useState } from 'react';
import './App.css';
import { Controls } from './Controls';
import { Results } from './Results';
import { Interpretation } from './Interpretation'

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
      <h1>FORGED IN THE DARK</h1>
      <h2>Dice Roller</h2>
      <h2>Select a Number to Roll</h2>
      <Controls setResult={setResult} setRolling={setRolling}/>
      <Results results={result} rolling={rolling}/>
      <Interpretation result={result} rolling={rolling} />
    </div>
  );
}

export default App;
