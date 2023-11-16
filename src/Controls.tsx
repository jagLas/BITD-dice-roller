import React from "react"

interface ControlProps {
    setResult: React.Dispatch<React.SetStateAction<number>>
}

interface DiceButtonProps extends ControlProps {
    num: number
}

function rollDice (num: number) {
    const results: number[] = [];
    let rolls = 0;
    while (rolls < num) {
        const result = Math.floor(Math.random() * (6) + 1);
        results.push(result)
        rolls++;
    }

    return results
}

function DiceButton ({num, setResult}: DiceButtonProps) {
    const onClickHandler = () => {
        console.log(rollDice(num))
        setResult(num)
    }

    return (
        <button onClick={onClickHandler}>{num}</button>
    )
}

export function Controls ({setResult} : ControlProps) {
    return (
        <div className="controls">
            <DiceButton num={1} setResult={setResult} />
        </div>
    )
}