import React, { useState } from "react"
import { Result } from "./utils/utils";
import { useDispatch } from "./utils/HistoryContext";
import { motion } from 'framer-motion'


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


function rollDice (num: number) {
    const results: number[] = [];
    let rolls = 0;
    while (rolls < num) {
        const result = Math.floor(Math.random() * (6) + 1);
        results.push(result);
        rolls++;
    }

    return results;
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

export function Controls ({setResult, setRolling, result, rolling} : ControlProps) {
    const [numControls, setNumControls] = useState<number>(6);
    const dispatch = useDispatch();

    const onClickHandler = (num: number) => () => {
        if (rolling) {
            return;
        }
        dispatch({type: 'ADD_TO_HISTORY', payload: result})
        const newResult = rollDice(num);
        setResult(newResult);
        setRolling(true);
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