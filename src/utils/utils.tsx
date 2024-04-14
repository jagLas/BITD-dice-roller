export type ResultType = 'Success' | 'Success with Consequences' | 'Failure' | 'Critical Success' | '';
export type Result = number[];
export type ResultColor = '#ff6ca4' | '#aef082' | '#fdb40b' | '#db1f1a' | 'white';

export function calculateResult(results: number[]): ResultType {
    if (results.length ===0) {
        return ''
    }
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

export const getResultColor = (resultType: ResultType) => {
    let color: ResultColor;
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

    return color;
}