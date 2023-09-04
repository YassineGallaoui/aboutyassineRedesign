import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Frame from "../Frame";
import Cursor from "../Cursor";
import SplashScreen from "../SplashScreen";

type Props = {
    children?: ReactNode;
    cursorHover: boolean;
    cursorText: string|null;
    updateCursorText: Function;
    updateCursorStatus: Function;
};

const Layout = ({ updateCursorText, updateCursorStatus, cursorHover, cursorText, children }: Props) => {
    return (
        <main>
            <Cursor hovered={cursorHover} txt={cursorText} />
            <SplashScreen updateCursorText={updateCursorText} updateCursorStatus={updateCursorStatus} />
            <Frame updateCursorText={updateCursorText} updateCursorStatus={updateCursorStatus} />
            {children}
        </main>
    );
};

export default Layout;
