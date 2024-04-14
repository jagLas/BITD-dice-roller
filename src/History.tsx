import { Interpretation } from "./Interpretation";
import { Results } from "./Results";
import { useHistory } from "./utils/HistoryContext";


export const History = () => {
    const history = useHistory();
    
    if (history.length === 0) {
        return null;
    }

    return (
        <div id='history'>
            <h2>History</h2>
            {history.map(result => {
                return <div>
                        <Results results={result.result ?? []} resultColor={result.resultColor ?? ''} rolling={false} />
                        <Interpretation rolling={false} resultType={result.resultType ?? ''} color={result.resultColor ?? ''}/>
                    </div>
        })}
        </div>
    )
}