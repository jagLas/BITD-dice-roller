import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./utils/socket";
import { useDispatch } from "./utils/HistoryContext";

export const useRollingController = () => {
    // web socket state
    const [connected, setIsConnected] = useState(false);
    const [prevResult, setPrevResult] = useState<number[]>([]);
    // const [players, setPlayers] = useState([]);

    // state for application
    const [result, setResult] = useState<number[]>([]);
    const [rolling, setRolling] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        function connect() {
            console.log('connected to room', params.roomId)
            setIsConnected(true);
            socket.emit("joinRoom", { roomId: params.roomId, password: 'testPassword', username: 'testName' })
        }

        function disconnect() {
            console.log('disconnected from room', params.roomId)
            setIsConnected(false);

            // update player state when someone disconnects
        }

        function playerJoined(player:string) {
            console.log('A new person joined', player);
            //create state for players and add a player when they join
        }
        
        function receiveRoll(roll: number[]) {
            console.log('Received', roll, 'from server')
            setResult(roll);
            setRolling(true);
        }

        // connect to websocket and define listeners if there is roomId
        if (params.roomId) {
            socket.connect();
            socket.on("connect", connect)
            socket.on("disconnect", disconnect)
            socket.on('playerJoined', playerJoined)
            socket.on('broadCastRoll', receiveRoll);
        }

        // cleanup function to disconnect when roomId changes
        return () => {
            socket.off("connect", connect);
            socket.off('disconnect', disconnect);
            socket.off('playerJoined', playerJoined);
            socket.off('broadCastRoll', receiveRoll);
            socket.disconnect();
        }
    }, [params.roomId])

    // useEffect to add a result on a new roll
    useEffect(() => {
        // dispatch the prevResult when not rolling to history;
        rolling && dispatch({type: 'ADD_TO_HISTORY', payload: prevResult});

        // set the current result to prevResult
        setPrevResult(result);
    }, [rolling, result])

    return {
        connected,
        result,
        setResult,
        rolling,
        setRolling
    }
}