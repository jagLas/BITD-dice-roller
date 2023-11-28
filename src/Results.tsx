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

    return (
        <div className="die">
            {num}
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