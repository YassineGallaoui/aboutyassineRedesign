import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Frame from "../frame";
import Cursor from "../Cursor";

type Props = {
    children?: ReactNode;
    title?: string;
    cursorHover: boolean;
    cursorText: string|null;
};

const Layout = ({ cursorHover, cursorText, children, title = "My App" }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Cursor hovered={cursorHover} txt={cursorText} />
                <Frame />
                {children}
            </main>
        </>
    );
};

export default Layout;
