import React from "react"
import { ReactComponent as DieFace1} from "./dice/1.svg"
import { ReactComponent as DieFace2} from "./dice/2.svg"
import { ReactComponent as DieFace3} from "./dice/3.svg"
import { ReactComponent as DieFace4} from "./dice/4.svg"
import { ReactComponent as DieFace5} from "./dice/5.svg"
import { ReactComponent as DieFace6} from "./dice/6.svg"
import { JsxElement } from "typescript"

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

function Die ({num} : {num : number}) {
    const dice : {[key: number]: any} = {
        1: <DieFace1 />,
        2: <DieFace2 />,
        3: <DieFace3 />,
        4: <DieFace4 />,
        5: <DieFace5 />,
        6: <DieFace6 />
    }

    return (
        <div className="die">
            {dice[num]}
        </div>
    )
}

export function Results ({results} : {results: number[]}) {
    return (
        <div id="results">
            {results.map((result, i) => {
                return (
                    <Die key={i} num={result}/>
                )
            })}
        </div>
    )
}