import {Container} from "@mui/material";
import NavBar from "../NavBar/NavBar.tsx";
import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <NavBar/>
            <main>
                <Container sx={{marginTop: "20px"}}>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;