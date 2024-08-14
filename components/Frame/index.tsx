import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { themeMode } from "../../pages/_app";
import cvIcon from "../../public/icons/CV.svg";
import darkIcon from "../../public/icons/dark_mode.svg";
import darkIconStars1 from "../../public/icons/dark_mode_stars_1.svg";
import darkIconStars2 from "../../public/icons/dark_mode_stars_2.svg";
import lightIcon from "../../public/icons/light_mode.svg";
import lightIconBase from "../../public/icons/light_mode_base.svg";
import linkedinIcon from "../../public/icons/linkedin.svg";
import mailIcon from "../../public/icons/mail.svg";
import logoY from "../../public/logo/logo-Y.svg";
import { breakpoints } from "../../utils/breakpoints";
import { colorApplicator } from "../../utils/colorFunctions";
import { createSpanStructure } from "../../utils/utility";
import styles from "./Frame.module.scss";

type FrameType = {
  updateCursorText: Function;
  updateCursorStatus: Function;
  preferredTheme: themeMode;
  lightColor: string;
  darkColor: string;
  deviceType: breakpoints;
};

export default function Frame({
  updateCursorText,
  updateCursorStatus,
  preferredTheme,
  lightColor,
  darkColor,
  deviceType,
}: FrameType) {
  const [themeIconRot, setThemeIconRot] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<themeMode>(preferredTheme);
  const router = useRouter();
  const { pathname } = router;
  const sectionNamesRC = ["About", "Projects"];
  const tl = gsap.timeline({});

  const themeChange = () => {
    setThemeIconRot((t) => t + 180);

    const body = document.querySelector("body");
    if (currentTheme === themeMode.lightMode) {
      body.className = themeMode[themeMode.darkMode];
      localStorage.setItem(
        "yas-theme-preference",
        themeMode[themeMode.darkMode]
      );
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      body.className = themeMode[themeMode.lightMode];
      localStorage.setItem(
        "yas-theme-preference",
        themeMode[themeMode.lightMode]
      );
      document.documentElement.setAttribute("data-theme", "light");
    }
    colorApplicator(lightColor, darkColor);
    setCurrentTheme(
      currentTheme === themeMode.darkMode
        ? themeMode.lightMode
        : themeMode.darkMode
    );
  };

  useEffect(() => {
    //menu navigation
    const body = document.querySelector("body");
    const liTagsRB = body.querySelectorAll(".contactsSocialDiv");
    const sectionNamesRB = ["Download", "Send", "More"];
    liTagsRB.forEach((element, index) => {
      element.innerHTML = createSpanStructure(sectionNamesRB[index]);
    });
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    const navTagRC = body.querySelector(
      ".sectionsNav div.singleNavItem div.singleNavItemText"
    );

    setTimeout(() => {
      if (navTagRC != null)
        navTagRC.innerHTML = createSpanStructure(
          sectionNamesRC[pathname === "/about" ? 1 : 0]
        );
    }, 800);
  }, [deviceType, pathname]);

  useEffect(() => {
    const navTagRC = document.querySelector(".sectionsNav div.singleNavItem");
    tl.to(navTagRC, {
      top: "0rem",
      duration: 0.8,
      delay: 0.85,
    });
  }, [pathname]);

  const singleNavItemAnimation = () => {
    const navTagRC = document.querySelector(".sectionsNav div.singleNavItem");
    tl.to(navTagRC, {
      top: "-5rem",
      duration: 0.8,
      delay: 0,
    });
  };

  useEffect(() => {
    preferredTheme === themeMode.darkMode
      ? setThemeIconRot(180)
      : setThemeIconRot(0);
    setCurrentTheme(preferredTheme);
  }, [preferredTheme]);

  const hoverSocialButtons = (e) => {
    updateCursorStatus(true);
    e.currentTarget.classList.add(styles.hovered);
  };

  const unhoverSocialButtons = (e) => {
    updateCursorStatus(false);
    e.currentTarget.classList.remove(styles.hovered);
  };

  return (
    <div className={styles.frameContainer}>
      <div className={styles.frameContainer__left}>
        <Link href="/" aria-label="Click here to go to the homepage">
          <div
            className={
              styles.frameContainer__left__logoWrapper + " logoWrapper"
            }
            onMouseOver={() => updateCursorStatus(true)}
            onMouseLeave={() => updateCursorStatus(false)}
          >
            <div className={styles.frameContainer__left__logoWrapper__logo}>
              <Image
                src={logoY}
                alt={`YAS`}
                className={styles.letterY + " invertImg"}
                fill
              />
            </div>
          </div>
        </Link>
        <div
          className={
            styles.frameContainer__left__lastUpdate + " lastUpdateText"
          }
        >
          Last update: <span id="lastUpdateDate"></span>
        </div>
      </div>
      <div className={styles.frameContainer__right}>
        <button
          className={styles.frameContainer__right__theme + " themeContainer"}
          style={{ transform: "rotate(" + themeIconRot + "deg)" }}
          onMouseOver={() => updateCursorStatus(true)}
          onMouseLeave={() => updateCursorStatus(false)}
          onClick={() => themeChange()}
          onSubmit={() => themeChange()}
          tabIndex={0}
          aria-label="Click here to toggle the theme between light and dark"
        >
          <div
            className={
              styles.frameContainer__right__theme__light + " lightModeIcon"
            }
          >
            <Image
              src={lightIconBase}
              fill
              alt="light mode"
              className="invertImg"
            />
            <Image
              className={styles.firstSun + " invertImg"}
              src={lightIcon}
              fill
              alt="light mode"
            />
            <Image
              className={styles.secondSun + " invertImg"}
              src={lightIcon}
              fill
              alt="light mode"
            />
            <Image
              className={styles.thirdSun + " invertImg"}
              src={lightIcon}
              fill
              alt="light mode"
            />
            <Image
              className={styles.fourthSun + " invertImg"}
              src={lightIcon}
              fill
              alt="light mode"
            />
          </div>
          <div
            className={
              styles.frameContainer__right__theme__dark + " darkModeIcon"
            }
          >
            <Image src={darkIcon} fill alt="dark mode" className="invertImg" />
            <Image
              className={styles.moonStars1 + " invertImg"}
              src={darkIconStars1}
              fill
              alt="dark mode"
            />

            <Image
              className={styles.moonStars2 + " invertImg"}
              src={darkIconStars2}
              fill
              alt="dark mode"
            />
          </div>
        </button>
        {
          <div className={styles.frameContainer__right__nav + " sectionsNav"}>
            <Link
              href={pathname === "/about" ? "/" : "/about"}
              className={styles.frameContainer__right__nav__navItem}
              onMouseOver={() => updateCursorStatus(true)}
              onMouseLeave={() => updateCursorStatus(false)}
            >
              <div
                className={
                  styles.frameContainer__right__nav__navItem__singleNavItem +
                  " singleNavItem underlineLineWithAnim"
                }
                onClick={() => singleNavItemAnimation()}
              >
                <div
                  className={
                    styles.frameContainer__right__nav__navItem__singleNavItemText +
                    " singleNavItemText"
                  }
                ></div>
              </div>
            </Link>
          </div>
        }
        <div className={styles.frameContainer__right__contacts + " contacts"}>
          <div
            className={styles.frameContainer__right__contacts__social}
            onMouseOver={(e) => hoverSocialButtons(e)}
            onMouseLeave={(e) => unhoverSocialButtons(e)}
          >
            <a
              href="/cv-gallaoui.pdf"
              rel="noreferrer noopener"
              target="_blank"
              aria-label="Click here to download my curriculum"
            >
              <div
                className={
                  styles.frameContainer__right__contacts__social__text +
                  " contactsSocial"
                }
              >
                <div className={"contactsSocialDiv"}></div>
              </div>
            </a>
            <Image
              src={cvIcon}
              fill
              alt="my curriculum vitae"
              className="invertImg"
            />
          </div>
          <div
            className={styles.frameContainer__right__contacts__social}
            onMouseOver={(e) => hoverSocialButtons(e)}
            onMouseLeave={(e) => unhoverSocialButtons(e)}
          >
            <a
              href="mailto:myassine.gallaoui@gmail.com"
              aria-label="Click here to send me an email"
            >
              <div
                className={
                  styles.frameContainer__right__contacts__social__text +
                  " contactsSocial"
                }
              >
                <div className={"contactsSocialDiv"}></div>
              </div>
            </a>
            <Image src={mailIcon} fill alt="mail" className="invertImg" />
          </div>
          <div
            className={styles.frameContainer__right__contacts__social}
            onMouseOver={(e) => hoverSocialButtons(e)}
            onMouseLeave={(e) => unhoverSocialButtons(e)}
          >
            <a
              href="https://www.linkedin.com/in/mohamed-yassine-gallaoui/"
              rel="noreferrer noopener"
              target="_blank"
              aria-label="Click here to check my LinkedIn profile"
            >
              <div
                className={
                  styles.frameContainer__right__contacts__social__text +
                  " contactsSocial"
                }
              >
                <div className={"contactsSocialDiv"}></div>
              </div>
            </a>
            <Image
              src={linkedinIcon}
              fill
              alt="linkedin"
              className="invertImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
