import { isVisible } from "@testing-library/user-event/dist/utils";
import { Interpretation } from "./Interpretation";
import { Results } from "./Results";
import { useHistory } from "./utils/HistoryContext";
import { motion } from 'framer-motion'


export const History = () => {
    const history = useHistory();

    if (history.length === 0) {
        return null;
    }

    return (
        <div id='history'>
            <h2>History</h2>
            {history.map(result => {
                return (
                    <motion.div 
                        key={result.rollNumber}
                        initial={{opacity: 0, scale: .5, height: 0}}
                        animate={{opacity: 1, scale: 1, height: 'auto'}}
                        transition={{
                            opacity: {duration: .5},
                            height: {duration: .25}
                        }}
                    >
                        <Results results={result.result ?? []} resultColor={result.resultColor ?? ''} rolling={false} />
                        <Interpretation rolling={false} resultType={result.resultType ?? ''} color={result.resultColor ?? ''}/>
                    </motion.div>)
        })}
        </div>
    )
}