import React from "react"

interface ControlProps {
    setResult: React.Dispatch<React.SetStateAction<number[]>>;
    setRolling: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DiceButtonProps {
    num: number
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
        <button className="dice-button" onClick={onClick}>{num}</button>
    )
}

export function Controls ({setResult, setRolling} : ControlProps) {
    const buttons = [];

    const onClickHandler = (num: number) => () => {
        const result = rollDice(num);
        setResult(result);
        setRolling(true);
    }

    for (let i = 1; i <= 6; i++) {
        buttons.push(
            <DiceButton num={i} key={i} onClick={onClickHandler(i)} />
        )
    }

    return (
        <div id="controls">
            {buttons}
        </div>
    )
}