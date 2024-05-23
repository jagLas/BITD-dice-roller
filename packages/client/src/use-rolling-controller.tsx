import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./utils/socket";
import { useDispatch } from "./utils/HistoryContext";

export const useRollingController = () => {
    const [connected, setIsConnected] = useState(false);
    const [prevResult, setPrevResult] = useState<number[]>([]);
    const [result, setResult] = useState<number[]>([]);
    const [rolling, setRolling] = useState(false);
    const dispatch = useDispatch();
    // const [players, setPlayers] = useState([]);

    const params = useParams();

    useEffect(() => {
        function connect() {
            console.log('connected')
            setIsConnected(true);
            socket.emit("joinRoom", { roomId: params.roomId, password: 'testPassword', username: 'testName' })
        }

        function disconnect() {
            console.log('disconnected')
            setIsConnected(false);
        }

        function playerJoined(player:string) {
            console.log('A new person joined', player);
        }
        
        function receiveRoll(roll: number[]) {
            console.log('Received', roll, 'from server')
            setResult(roll);
            setRolling(true);
        }

        if (params.roomId) {
            socket.connect();
            socket.on("connect", connect)
            socket.on("disconnect", disconnect)
            socket.on('playerJoined', playerJoined)
            socket.on('broadCastRoll', receiveRoll);
        }

        return () => {
            socket.off("connect", connect);
            socket.off('disconnect', disconnect);
            socket.off('playerJoined', playerJoined);
            // socket.off('broadCastRoll', receiveRoll)
            socket.off('broadCastRoll', receiveRoll);
            socket.disconnect();
        }
    }, [params.roomId])

    // useEffect to add a result on a new roll
    useEffect(() => {
        // dispatch when not rolling the prevResult to history;
        rolling && dispatch({type: 'ADD_TO_HISTORY', payload: prevResult});

        // set the current result to prevResult
        setPrevResult(result);
    }, [rolling, result])

    return {connected, result, setResult, rolling, setRolling}
}