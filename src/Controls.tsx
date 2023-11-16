import React from "react"

interface ControlProps {
    setResult: React.Dispatch<React.SetStateAction<number>>
}

interface DiceButtonProps extends ControlProps {
    num: number
}

function DiceButton ({num, setResult}: DiceButtonProps) {
    const onClickHandler = () => {
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