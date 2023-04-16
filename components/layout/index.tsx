import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Frame from "../Frame";
import Cursor from "../Cursor";

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
            <Frame updateCursorText={updateCursorText} updateCursorStatus={updateCursorStatus} />
            {children}
        </main>
    );
};

export default Layout;
