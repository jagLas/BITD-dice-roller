import { ResultType } from "./utils/utils";

interface InterpretationProps {
    rolling: boolean;
    resultType: ResultType;
    color: string;
}

export const Interpretation = ({resultType, rolling, color}: InterpretationProps) => {
    return (
        <>
            {!rolling && <h3 style={{color}} id='result-eval'>{resultType}</h3>}
        </>
    )
}