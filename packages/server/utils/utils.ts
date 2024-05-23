export type ResultType = 'Success' | 'Success with Consequences' | 'Failure' | 'Critical Success' | '';
export type Result = number[];
export type ResultColor = '#ff6ca4' | '#aef082' | '#fdb40b' | '#db1f1a' | 'white';


export function rollDice (num: number) {
    const results: number[] = [];
    let rolls = 0;
    while (rolls < num) {
        const result = Math.floor(Math.random() * (6) + 1);
        results.push(result);
        rolls++;
    }

    return results;
}