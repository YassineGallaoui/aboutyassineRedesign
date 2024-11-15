/* eslint-disable @next/next/no-img-element */

import { animate } from "motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createSpanStructureV2 } from "../../utils/utility";
import styles from "./Nav.module.scss";

interface NavProps {
    updateCursorStatus: Function;
}

export default function Nav<NavProps>({ updateCursorStatus }) {
    const router = useRouter();
    const { pathname } = router;
    const sectionNamesRC = ["About", "Projects"];

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('#singleNavItemText').innerHTML = createSpanStructureV2(
                sectionNamesRC[pathname === "/about" ? 1 : 0]
            );
        }, 800);
    }, [pathname]);

    const singleNavItemAnimation = () => {
        animate('#singleNavItem', {
            x: "15rem",
        }, {
            duration: 0.8,
        });
    };

    useEffect(() => {
        animate('#singleNavItem', {
            x: 0
        }, {
            duration: 0.8,
            delay: 0.85,
        });
    }, [pathname]);

    return (
        <div className={styles.nav + " sectionsNav"}>
            <Link
                href={pathname === "/about" ? "/" : "/about"}
                className={styles.nav__navItem}
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
            >
                <div
                    id={"singleNavItem"}
                    className={styles.nav__navItem__singleNavItem}
                    onClick={() => singleNavItemAnimation()}
                >
                    <div
                        id={"singleNavItemText"}
                        className={
                            styles.nav__navItem__singleNavItemText +
                            " singleNavItemText"
                        }
                    ></div>
                </div>
            </Link>
        </div>
    )
};
