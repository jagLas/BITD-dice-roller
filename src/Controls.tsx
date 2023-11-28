import React from "react"

interface ControlProps {
    setResult: React.Dispatch<React.SetStateAction<number[]>>
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
        const result = rollDice(num)
        setResult(result)
    }

    return (
        <button onClick={onClickHandler}>{num}</button>
    )
}

export function Controls ({setResult} : ControlProps) {
    const buttons = []
    for (let i = 1; i <= 6; i++) {
        buttons.push(
            <DiceButton num={i} key={i} setResult={setResult} />
        )
    }

    return (
        <div className="controls">
            {buttons}
        </div>
    )
}