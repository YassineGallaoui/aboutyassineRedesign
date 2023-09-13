import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Cursor from "../Cursor";
import SplashScreen from "../SplashScreen";
import Frame from "../frame";

type Props = {
    updateCursorText: Function;
    updateCursorStatus: Function;
    cursorHover: boolean;
    cursorText: string|null;
    lightColor: string;
    darkColor: string;
    children?: ReactNode;
};

const Layout = ({ updateCursorText, updateCursorStatus, cursorHover, cursorText, lightColor, darkColor, children }: Props) => {
    return (
        <main>
            <Cursor 
                hovered={cursorHover} 
                txt={cursorText} />
            <SplashScreen 
                updateCursorText={updateCursorText} 
                updateCursorStatus={updateCursorStatus} />
            <Frame 
                updateCursorText={updateCursorText} 
                updateCursorStatus={updateCursorStatus} 
                lightColor={lightColor} 
                darkColor={darkColor}/>
            {children}
        </main>
    );
};

export default Layout;
