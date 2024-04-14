import { ResultType } from "./utils/utils";

interface InterpretationProps {
    rolling: boolean;
    resultType: ResultType;
    color: string;
}

export const Interpretation = ({resultType, rolling, color}: InterpretationProps) => {
    return (
        <>
            {rolling && <h3 className='interpretation' style={{color: 'white', opacity: .5}} id='result-eval'>Rolling...</h3>}
            {!rolling && <h3 className='interpretation' style={{color}} id='result-eval'>{resultType}</h3>}
        </>
    )
}