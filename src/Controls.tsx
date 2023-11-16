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

function calculateResult(results: number[]) {
    let max = 1;
    let crit = false;

    results.forEach(result => {
        if (max === 6 && result === 6) {
            crit = true;
        }
        if (result > max) {
            max = result
        }
    })

    return crit ? 'crit' : max;
}

function DiceButton ({num, setResult}: DiceButtonProps) {
    const onClickHandler = () => {
        const result = rollDice(num)
        console.log(result, calculateResult(result))
        setResult(num)
    }

    return (
        <button onClick={onClickHandler}>{num}</button>
    )
}

export function Controls ({setResult} : ControlProps) {
    return (
        <div className="controls">
            <DiceButton num={2} setResult={setResult} />
        </div>
    )
}