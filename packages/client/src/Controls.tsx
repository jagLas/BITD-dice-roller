import React, { useState } from "react"
import { Result } from "./utils/utils";
import { motion } from 'framer-motion'
import { socket } from "./utils/socket";
import { useParams } from "react-router";
import { rollDice } from "./utils/utils";


interface ControlProps {
    setResult: React.Dispatch<React.SetStateAction<number[]>>;
    setRolling: React.Dispatch<React.SetStateAction<boolean>>;
    result: Result;
    rolling: boolean;
}

interface DiceButtonProps {
    num: number
    onClick: () => void;
}

interface modifyControlsProps {
    children?: any;
    onClick: () => void;
}


function DiceButton ({num, onClick}: DiceButtonProps) {
    return (
        <button
            className="button dice"
            onClick={onClick}
        >
            {`${num}d6`}
        </button>
    )
}

function ModifyControls ({children, onClick}: modifyControlsProps) {
    return (
        <button onClick={onClick} className="button modifier">{children}</button>
    )
}

export function Controls ({setResult, setRolling, rolling} : ControlProps) {
    const [numControls, setNumControls] = useState<number>(6);
    const { roomId } = useParams();

    const onClickHandler = (num: number) => () => {
        if (rolling) {
            return;
        }

        let newResult: number[];

        if(socket.connected) {
            socket.emit('roll', {numDice: num, roomId})
        } else {
            newResult = rollDice(num);
            setResult(newResult);
            setRolling(true);
        }
    }

    const buttons = [];
    for (let i = 1; i <= numControls; i++) {
        buttons.push(
            <DiceButton num={i} key={i} onClick={onClickHandler(i)} />
        )
    }

    return (
        <motion.div layout transition={{duration: .01}} id="controls">
            <ModifyControls key={'first control'} onClick={() => setNumControls(prevState => prevState !== 1 ? prevState - 1 : prevState)}>
                -
            </ModifyControls>
            <motion.div layout transition={{duration: .3}} id='button-controls'>
                {buttons}
            </motion.div>
            <ModifyControls key={'second control'} onClick={() => setNumControls(prevState => prevState + 1)}>+</ModifyControls>
        </motion.div>
    )
}