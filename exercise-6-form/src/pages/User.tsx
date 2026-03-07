import {Avatar} from "../components/Avatar.tsx";
import {Intro} from "../components/Intro.tsx";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../components/UserContext.tsx";

export const User = () => {
    const user = useContext(UserContext);

    return (
        <>
            <Avatar></Avatar>
            <UserContext value={user}>
                <Intro></Intro>
            </UserContext>
            <Link to={'/'}>Back</Link>
        </>
    )
}