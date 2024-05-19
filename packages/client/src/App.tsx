import { useEffect, useState } from 'react';
import './App.css';
import { Controls } from './Controls';
import { Results } from './Results';
import { Interpretation } from './Interpretation'
import { calculateResult, getResultColor } from './utils/utils';
import { History } from './History';
import { Outlet, useParams } from 'react-router-dom';
import { socket } from './utils/socket';

function App() {
  const [result, setResult] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const resultType = calculateResult(result);
  const resultColor = getResultColor(resultType);

  const params = useParams();

  useEffect(() => {
    function connect() {
      console.log('connected')
      socket.emit("joinRoom", {roomId: params.roomId, password: 'testPassword'})
    }

    function disconnect() {
      console.log('disconnected')
    }

    function playerJoined() {
      console.log('A new person joined');
    }

    if (params.roomId) {
      socket.connect();
      socket.on("connect", connect)
      socket.on("disconnect", disconnect)
      socket.on('playerJoined', playerJoined)
    }

    return () => {
      socket.off("connect", connect);
      socket.off('disconnect', disconnect);
      socket.off('playerJoined', playerJoined);
      socket.disconnect();
    }
  }, [])


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
        <div>
          <h1>FORGED IN THE DARK</h1>
          <h3>Dice Roller</h3>
        </div>

        <h2>Select a Number to Roll</h2>

        <Controls setResult={setResult} setRolling={setRolling} result={result} rolling={rolling} />

        <Results results={result} rolling={rolling} resultColor={resultColor}/>

        {result.length > 0 && <Interpretation rolling={rolling} resultType={resultType} color={resultColor}/>}
        <Outlet />
        <History />
    </div>
  );
}

export default App;
