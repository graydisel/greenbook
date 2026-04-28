import {Link} from "react-router-dom";

export const ErrorBoundary = () => {
    return (
        <>
            Failed to load this page. Please return to the <Link to={"/"}>Main page</Link>
        </>
    )
}