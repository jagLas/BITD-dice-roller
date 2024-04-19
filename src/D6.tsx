import { useEffect, useState } from "react"

export const DieFace1 = () => {
    return (
        <svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 -922.52)" stroke="#000" stroke-linecap="square">
            <rect x="10" y="932.52" width="180" height="180" rx="24" ry="24" fill="#fff" stroke-width="9.6"/>
            <circle cx="100" cy="1022.5" r="20"/>
            </g>
        </svg>
    )
}

export const DieFace2 = () => {
    return (
        <svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 -922.52)" stroke="#000" stroke-linecap="square">
            <rect x="10" y="932.52" width="180" height="180" rx="24" ry="24" fill="#fff" stroke-width="9.6"/>
            <circle cx="150" cy="972.52" r="20"/>
            <circle cx="50" cy="1072.5" r="20"/>
            </g>
        </svg>
    )
}

export const DieFace3 = () => {
    return (
        <svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <g transform="translate(0 -922.52)" stroke="#000" stroke-linecap="square">
          <rect x="10" y="932.52" width="180" height="180" rx="24" ry="24" fill="#fff" stroke-width="9.6"/>
          <g>
           <circle cx="100" cy="1022.5" r="20"/>
           <circle cx="150" cy="972.52" r="20"/>
           <circle cx="50" cy="1072.5" r="20"/>
          </g>
         </g>
        </svg>
    )
}

export const DieFace4 = () => {
    return (
        <svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 -922.52)" stroke="#000" stroke-linecap="square">
            <rect x="10" y="932.52" width="180" height="180" rx="24" ry="24" fill="#fff" stroke-width="9.6"/>
            <g>
            <circle cx="50" cy="972.52" r="20"/>
            <circle cx="150" cy="972.52" r="20"/>
            <circle cx="50" cy="1072.5" r="20"/>
            <circle cx="150" cy="1072.5" r="20"/>
            </g>
            </g>
        </svg>
    )
}

export const DieFace5 = () => {
    return (
        <svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 -922.52)" stroke="#000" stroke-linecap="square">
            <rect x="10" y="932.52" width="180" height="180" rx="24" ry="24" fill="#fff" stroke-width="9.6"/>
            <g>
            <circle cx="100" cy="1022.5" r="20"/>
            <circle cx="150" cy="972.52" r="20"/>
            <circle cx="50" cy="1072.5" r="20"/>
            <circle cx="50" cy="972.52" r="20"/>
            <circle cx="150" cy="1072.5" r="20"/>
            </g>
            </g>
        </svg>
    )
}

export const DieFace6 = () => {
    return (
        <svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 -922.52)" stroke="#000" stroke-linecap="square">
        <rect x="10" y="932.52" width="180" height="180" rx="24" ry="24" fill="#fff" stroke-width="9.6"/>
        <g>
        <circle cx="50" cy="972.52" r="20"/>
        <circle cx="150" cy="972.52" r="20"/>
        <circle cx="50" cy="1022.5" r="20"/>
        <circle cx="150" cy="1022.5" r="20"/>
        <circle cx="50" cy="1072.5" r="20"/>
        <circle cx="150" cy="1072.5" r="20"/>
        </g>
        </g>
        </svg>
    )
}


export default function D6 ({hightlight, num, rolling, highlightColor} : {hightlight?: boolean, num : number, rolling: boolean, highlightColor?: string,}) {
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

    return (
        <div className={`die ${!rolling}`} style={{backgroundColor: hightlight && !rolling ? highlightColor : 'unset'}}>
            {rolling ? dice[randomRes] : dice[num]}
        </div>
    )
}