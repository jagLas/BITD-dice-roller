import { useState } from 'react';
import './App.css';
import { Controls } from './Controls';
import { Results } from './Results';

function App() {
  const [result, setResult] = useState<number[]>([])

  return (
    <div className="App">
      <Controls setResult={setResult}/>
      <Results results={result}/>
    </div>
  );
}

export default App;
