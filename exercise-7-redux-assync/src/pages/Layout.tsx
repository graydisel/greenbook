import {Header} from "../components/layout/Header.tsx";
import {Outlet, useMatches} from "react-router-dom";
import {Footer} from "../components/layout/Footer.tsx";
import {Notification} from "../components/common/Notification.tsx";
import { useEffect } from "react";

export const Layout = () => {
    const matches = useMatches();

    useEffect(() => {

        const currentMatch = [...matches]
        .reverse()
        .find((match) => (match.handle as {title: string})?.title);

        const title = (currentMatch?.handle as any)?.title ?? 'Greenbook Internet Shop';
        document.title = title;
    }, [matches]);

    return (
        <>
            <Header/>
                <Outlet/>
            <Footer/>
            <Notification/>
        </>
    )
}