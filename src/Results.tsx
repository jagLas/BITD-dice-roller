import D6 from "./D6.tsx";

export function Results ({results, resultColor, rolling} : {results: number[], resultColor: string, rolling: boolean}){
    const max = Math.max(...results)
    const firstDie = results.indexOf(max);

    return (
        <div id="results">
            {results.map((result, i) => {
                //only highlight the first die if it's less than 6. Otherwise, highlight them all
                let hightlight = false;
                if (max < 6) {
                    hightlight = (result === max) && (i === firstDie);
                } else {
                    hightlight = (result === max);
                }

                return (
                    <D6 key={i} hightlight={hightlight} num={result} rolling={rolling} highlightColor={resultColor}/>
                )
            })}
        </div>
    )
}