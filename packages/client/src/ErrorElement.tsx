import { useRouteError } from "react-router-dom"

export const ErrorElement = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <h1>Error</h1>
    )
}