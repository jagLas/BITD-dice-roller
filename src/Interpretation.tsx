interface InterpretationProps {
    result: number[];
    rolling: boolean;
}

type ResultType = 'Success' | 'Success with Consequences' | 'Failure' | 'Critical Success';

function calculateResult(results: number[]): ResultType {
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

    if (crit) {
        return 'Critical Success'
    } else if (max === 6) {
        return 'Success'
    } else if (max >= 4) {
        return 'Success with Consequences'
    } else {
        return 'Failure'
    }
}

export const Interpretation = ({result, rolling}: InterpretationProps) => {
    const resultType = calculateResult(result);

    let color;
    switch(resultType) {
        case 'Critical Success':
            color = '#ff6ca4';
            break;
        case 'Success':
            color = '#aef082'
            break;
        case 'Success with Consequences':
            color = '#fdb40b';
            break;
        case 'Failure':
            color = '#db1f1a'
            break;
        default:
            color = 'white';
    }

    return (
        <>
            {!rolling && <h3 style={{color}} id='result-eval'>{resultType}</h3>}
        </>
    )
}