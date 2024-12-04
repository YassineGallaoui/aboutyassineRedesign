/* eslint-disable @next/next/no-img-element */

import darkIcon from "../../public/icons/dark_mode.svg";
import darkIconStars1 from "../../public/icons/dark_mode_stars_1.svg";
import darkIconStars2 from "../../public/icons/dark_mode_stars_2.svg";
import lightIcon from "../../public/icons/light_mode.svg";
import lightIconBase from "../../public/icons/light_mode_base.svg";

import styles from "./ThemeSwitcher.module.scss";

import useThemeStore, { themeMode } from "../../store/themeStore";
import { colorApplicator } from "../../utils/colorFunctions";

export default function ThemeSwitcher({ updateCursorStatus }) {
    const { theme, iconRotation, colors, setTheme, } = useThemeStore();

    const toggleTheme = () => {
        setTheme(theme === themeMode.light ? themeMode.dark : themeMode.light);

        const body = document.querySelector("body");
        if (theme === themeMode.light) {
            body.className = themeMode[themeMode.dark];
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            body.className = themeMode[themeMode.light];
            document.documentElement.setAttribute("data-theme", "light");
        }
        colorApplicator(colors.lightColor, colors.darkColor);
    };

    return (
        <button
            className={styles.theme + " themeContainer"}
            style={{ transform: "rotate(" + iconRotation + "deg)" }}
            onMouseOver={() => updateCursorStatus(true)}
            onMouseLeave={() => updateCursorStatus(false)}
            onClick={() => toggleTheme()}
            tabIndex={0}
            aria-label="Click here to toggle the theme between light and dark"
        >
            <div
                className={
                    styles.theme__light + " lightIcon"
                }
            >
                <img
                    src={lightIconBase.src}
                    alt="light mode"
                    className="invertImg"
                />
                <img
                    className={styles.firstSun + " invertImg"}
                    src={lightIcon.src}
                    alt="light mode"
                />
                <img
                    className={styles.secondSun + " invertImg"}
                    src={lightIcon.src}
                    alt="light mode"
                />
                <img
                    className={styles.thirdSun + " invertImg"}
                    src={lightIcon.src}
                    alt="light mode"
                />
                <img
                    className={styles.fourthSun + " invertImg"}
                    src={lightIcon.src}
                    alt="light mode"
                />
            </div>
            <div
                className={
                    styles.theme__dark + " darkIcon"
                }
            >
                <img
                    className="invertImg"
                    src={darkIcon.src}
                    alt="dark mode"
                />
                <img
                    className={styles.moonStars1 + " invertImg"}
                    src={darkIconStars1.src}
                    alt="dark mode"
                />

                <img
                    className={styles.moonStars2 + " invertImg"}
                    src={darkIconStars2.src}
                    alt="dark mode"
                />
            </div>
        </button>
    );
};
