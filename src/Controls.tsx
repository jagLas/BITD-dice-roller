import React, { useState } from "react"
import { Result } from "./utils/utils";
import { useDispatch } from "./utils/HistoryContext";


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
        <button className="button dice" onClick={onClick}>{num}</button>
    )
}

function ModifyControls ({children, onClick}: modifyControlsProps) {
    return (
        <div onClick={onClick}>
            <button className="button modifier">{children}</button>
        </div>
    )
}

export function Controls ({setResult, setRolling, result, rolling} : ControlProps) {
    const [numControls, setNumControls] = useState<number>(6);
    const buttons = [];
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

    for (let i = 1; i <= numControls; i++) {
        buttons.push(
            <DiceButton num={i} key={i} onClick={onClickHandler(i)} />
        )
    }

    return (
        <div id="controls">
            <ModifyControls onClick={() => setNumControls(prevState => prevState !== 1 ? prevState - 1 : prevState)}>
                -
            </ModifyControls>
            
            <div id='button-controls'>
                {buttons}
            </div>

            <ModifyControls onClick={() => setNumControls(prevState => prevState + 1)}>+</ModifyControls>
        </div>
    )
}