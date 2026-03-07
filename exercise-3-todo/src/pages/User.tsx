import {Avatar} from "../components/Avatar.tsx";
import {Intro} from "../components/Intro.tsx";
import {Link} from "react-router-dom";

export const User = () => {
    return (
        <>
            <Avatar></Avatar>
            <Intro name={'Alexandra Ergo'} sex={'Female'}></Intro>
            <Link to={'/'}>Back</Link>
        </>
    )
}