import {createContext, type ReactNode, useState} from "react";

export interface UserInterface {
    name: string;
    sex: string;
    skills: string[];
    changeName: () => void;
}

const names: string[] = ['Alexandra Ergo', 'Brian Goldwings', 'Antony Killbow'];


// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserInterface | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState(names[0]);

    const changeName = () => {
        const randomIndex = Math.floor(Math.random() * names.length);
        setName(names[randomIndex]);
    };

    return (
        <UserContext value={{ name, sex: "Female", skills: ['HTML', 'CSS', 'JavaScript'], changeName }}>
            {children}
        </UserContext>
    );
};