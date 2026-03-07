import {useContext} from "react";
import {UserContext} from "./UserContext.tsx";

export const Intro = () => {
    const userContext = useContext(UserContext);
    if (!userContext) return null;

    return (
        <>
            <div style={{padding:'10px'}}>
                <p>Name: {userContext.name}</p>
                <p>Sex: {userContext.sex}</p>
                <p>Skills:</p>
                {userContext.skills.map((skill) => (
                    <div key={skill}>{skill}</div>
                ))}
            </div>
            <div>
                <button onClick={userContext.changeName}>Change user</button>
            </div>
        </>
    )
}