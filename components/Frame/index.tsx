import { useEffect, useState } from "react";
import styles from "./Frame.module.scss";
import { createSpanStructure } from "../../utils/utility";
import Link from "next/link";
import Image from "next/image";
import logoY from "../../public/logo/logo-Y.svg";
import lightIcon from "../../public/icons/light_mode.svg";
import lightIconBase from "../../public/icons/light_mode_base.svg";
import darkIcon from "../../public/icons/dark_mode.svg";
import darkIconStars1 from "../../public/icons/dark_mode_stars_1.svg";
import darkIconStars2 from "../../public/icons/dark_mode_stars_2.svg";
import cvIcon from "../../public/icons/CV.svg";
import mailIcon from "../../public/icons/mail.svg";
import linkedinIcon from "../../public/icons/linkedin.svg";
import websiteLastUpdateDate from "../../websiteLastUpdateDate";
import { colorApplicator } from "../../utils/colorFunctions";
import { themeMode } from "../../pages/_app";
import { breakpoints } from "../../utils/breakpoints";
import { useRouter } from "next/router";
import gsap from "gsap";

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
    const liTagsRC = body.querySelectorAll(".sectionsNav li div.twoNavItem");
    const liTagsRB = body.querySelectorAll(".contactsSocial div");
    const sectionNamesRB = ["Download", "Send", "More"];
    if (liTagsRC != null)
      liTagsRC.forEach((element, index) => {
        element.innerHTML = createSpanStructure(sectionNamesRC[index]);
      });
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
        <Link href="/">
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
          Last update: {websiteLastUpdateDate.getLastUpdateDate()}
        </div>
      </div>
      <div className={styles.frameContainer__right}>
        <div
          className={styles.frameContainer__right__theme + " themeContainer"}
          style={{ transform: "rotate(" + themeIconRot + "deg)" }}
          onMouseOver={() => updateCursorStatus(true)}
          onMouseLeave={() => updateCursorStatus(false)}
          onClick={() => themeChange()}
          tabIndex={0}
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
        </div>
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
            >
              <div
                className={
                  styles.frameContainer__right__contacts__social__text +
                  " contactsSocial"
                }
              >
                <div></div>
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
            <a href="mailto:myassine.gallaoui@gmail.com">
              <div
                className={
                  styles.frameContainer__right__contacts__social__text +
                  " contactsSocial"
                }
              >
                <div></div>
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
            >
              <div
                className={
                  styles.frameContainer__right__contacts__social__text +
                  " contactsSocial"
                }
              >
                <div></div>
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
