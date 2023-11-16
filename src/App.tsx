import { useState } from 'react';
import './App.css';
import { Controls } from './Controls';

function App() {
  const [result, setResult] = useState(0)

  return (
    <div className="App">
      <Controls setResult={setResult}/>
    </div>
  );
}

export default App;
