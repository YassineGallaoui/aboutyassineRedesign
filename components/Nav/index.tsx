/* eslint-disable @next/next/no-img-element */

import { animate } from "motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { createSpanStructureV2 } from "../../utils/utility";
import styles from "./Nav.module.scss";

interface NavProps {
    updateCursorStatus: Function;
}

type pagesType = {
    url: string,
    label: string,
}

export default function Nav<NavProps>({ updateCursorStatus }) {
    const router = useRouter();
    const { pathname } = router;

    const toShowNavItems = useRef<pagesType[]>([{
        url: '/about',
        label: "About",
    }, {
        url: '/lab',
        label: "Lab",
    }]);

    useEffect(() => {
        const sectionNamesRC: pagesType[] = [{
            url: '/',
            label: "Projects",
        }, {
            url: '/about',
            label: "About",
        }, {
            url: '/lab',
            label: "Lab",
        }];

        setTimeout(() => {
            toShowNavItems.current = sectionNamesRC.filter(el => el.url != pathname);

            Array.from(document.querySelectorAll('.singleNavText')).map((el, index) => {
                const l = toShowNavItems.current[index].label;
                el.innerHTML = createSpanStructureV2(l)
            });
        }, 800);
    }, [pathname]);

    const loadPageAnimation = async () => {
        document.querySelectorAll('.navItem').forEach(async el => {
            await animate(el, {
                x: "5rem",
            }, {
                duration: 0.8,
            });
            await animate(el, {
                x: "0rem",
            }, {
                duration: 0.9,
            });
        })
    }

    const mouseOverLink = async (e) => {
        console.log(e);
        let el = e.currentTarget.firstElementChild as HTMLElement;
        await animate(el, {
            x: "0.3rem",
        }, {
            duration: 0.3,
        });
    }

    const mouseLeaveLink = async (e) => {
        let el = e.currentTarget.firstElementChild as HTMLElement;
        await animate(el, {
            x: "0rem",
        }, {
            duration: 0.3,
        });
    }

    return (
        <div className={styles.nav + " sectionsNav"} onClick={() => loadPageAnimation()}>
            {toShowNavItems.current.map((el, index) => (
                <Link
                    key={index}
                    href={el.url}
                    className={styles.nav__navItem + " navItem"}
                    onMouseOver={(e) => { mouseOverLink(e); updateCursorStatus(true) }}
                    onMouseLeave={(e) => { mouseLeaveLink(e); updateCursorStatus(false) }}
                >
                    <div
                        className={styles.nav__navItem__singleNavItem + " singleNavItem"}
                    >
                        <div
                            data-label={el.label}
                            className={
                                styles.nav__navItem__singleNavText +
                                " singleNavText"
                            }
                        ></div>
                    </div>
                </Link>
            ))}
        </div>
    )
};
