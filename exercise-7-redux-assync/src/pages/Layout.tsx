import {Header} from "../components/layout/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/layout/Footer.tsx";

export const Layout = () => {
    return (
        <>
            <Header/>
                <Outlet/>
            <Footer/>
        </>
    )
}