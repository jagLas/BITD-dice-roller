import { useEffect, useState } from "react"
import { ReactComponent as DieFace1} from "./dice/1.svg"
import { ReactComponent as DieFace2} from "./dice/2.svg"
import { ReactComponent as DieFace3} from "./dice/3.svg"
import { ReactComponent as DieFace4} from "./dice/4.svg"
import { ReactComponent as DieFace5} from "./dice/5.svg"
import { ReactComponent as DieFace6} from "./dice/6.svg"

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

function Die ({num, rolling} : {num : number, rolling: boolean}) {
    const dice : {[key: number]: any} = {
        1: <DieFace1 />,
        2: <DieFace2 />,
        3: <DieFace3 />,
        4: <DieFace4 />,
        5: <DieFace5 />,
        6: <DieFace6 />
    };

    const [randomRes, setRandomRes] = useState<number>(num);

    useEffect(() => {
        if (rolling) {
            const randomRoll = setInterval(() => {
                const randomInt = Math.floor(Math.random() * (7 - 1) + 1);
                setRandomRes(randomInt);
            }, 50);

            return () => clearInterval(randomRoll);
        }
    }, [rolling])

    if (rolling) {
        return (
            <div className="die">
                {dice[randomRes]}
            </div>
        );
    };

    return (
        <div className="die">
            {dice[num]}
        </div>
    )
}

export function Results ({results, rolling} : {results: number[], rolling: boolean}){
    return (
        <div id="results">
            {results.map((result, i) => {
                return (
                    <Die key={i} num={result} rolling={rolling}/>
                )
            })}
        </div>
    )
}