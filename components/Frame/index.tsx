import {useEffect, useState} from "react";
import styles from './Frame.module.scss'
import { createSpanStructure } from '../../utils/utility'
import Link from 'next/link'
import Image from 'next/image'
import logoY from '../../public/logo/logo-Y.svg'
import lightIcon from '../../public/icons/light_mode.svg'
import lightIconBase from '../../public/icons/light_mode_base.svg'
import darkIcon from '../../public/icons/dark_mode.svg'
import darkIconStars1 from '../../public/icons/dark_mode_stars_1.svg'
import darkIconStars2 from '../../public/icons/dark_mode_stars_2.svg'
import cvIcon from '../../public/icons/CV.svg'
import mailIcon from '../../public/icons/mail.svg'
import linkedinIcon from '../../public/icons/linkedin.svg'
import websiteLastUpdateDate from '../../websiteLastUpdateDate';
import { colorApplicator } from "../../utils/colorFunctions";
import { themeMode } from "../../pages/_app";

type FrameType = {
  updateCursorText: Function, 
  updateCursorStatus: Function, 
  preferredTheme: themeMode, 
  lightColor: string, 
  darkColor: string,
}

export default function Frame({
  updateCursorText,
  updateCursorStatus,
  preferredTheme,
  lightColor,
  darkColor,
}: FrameType) {
  const [themeIconRot, setThemeIconRot] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<themeMode>(preferredTheme);

  const themeChange = () => {
    setThemeIconRot(themeIconRot + 180);
    console.log(themeMode[currentTheme], "currentTheme");
    setCurrentTheme(
      currentTheme === themeMode.darkMode
        ? themeMode.lightMode
        : themeMode.darkMode
    );
    const body = document.querySelector("body");
    if (currentTheme === themeMode.darkMode) {
      body.classList.add("lightMode");
      body.classList.remove("darkMode");
      localStorage.setItem(
        "yas-theme-preference",
        themeMode[themeMode.lightMode]
      );
      document.documentElement.setAttribute("data-theme", "light");
      colorApplicator(lightColor, darkColor);
    } else {
      body.classList.add("darkMode");
      body.classList.remove("lightMode");
      localStorage.setItem(
        "yas-theme-preference",
        themeMode[themeMode.darkMode]
      );
      document.documentElement.setAttribute("data-theme", "dark");
      colorApplicator(lightColor, darkColor);
    }
  };

  useEffect(() => {
    preferredTheme === themeMode.darkMode
      ? setThemeIconRot(themeIconRot + 180)
      : setThemeIconRot(themeIconRot + 0);

    //menu navigation
    const body = document.querySelector("body");
    const liTagsRC = body.querySelectorAll(".sectionsNav li div");
    const liTagsRB = body.querySelectorAll(".contactsSocial div");
    const sectionNamesRC = ["About", "Career"];
    const sectionNamesRB = ["Download", "Send", "More"];
    liTagsRC.forEach((element, index) => {
      element.innerHTML = createSpanStructure(sectionNamesRC[index]);
    });
    liTagsRB.forEach((element, index) => {
      element.innerHTML = createSpanStructure(sectionNamesRB[index]);
    });
  }, []);

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
            className={styles.frameContainer__left__logoWrapper}
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
        <div className={styles.frameContainer__left__lastUpdate}>
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
        <div className={styles.frameContainer__right__nav + " sectionsNav"}>
          <ul>
            <Link href="/about">
              <li
                className="invertImg"
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
              >
                <div></div>
              </li>
            </Link>
            <Link href="/">
              <li
                className="invertImg"
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
              >
                <div></div>
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.frameContainer__right__contacts}>
          <div
            className={styles.frameContainer__right__contacts__social}
            onMouseOver={(e) => hoverSocialButtons(e)}
            onMouseLeave={(e) => unhoverSocialButtons(e)}
          >
            <a href="/cv.pdf" rel="noreferrer noopener" target="_blank"></a>
            <div
              className={styles.frameContainer__right__contacts__social__text+" contactsSocial"}
            >
              <div></div>
            </div>
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
            <a href="mailto:myassine.gallaoui@gmail.com"></a>
            <div
              className={styles.frameContainer__right__contacts__social__text+" contactsSocial"}
            >
              <div></div>
            </div>
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
            ></a>
            <div
              className={styles.frameContainer__right__contacts__social__text+" contactsSocial"}
            >
              <div></div>
            </div>
            <Image
              src={linkedinIcon}
              fill
              alt="linkedin"
              className="invertImg"
            />
          </div>
          {/* <div
              className={styles.frameContainer__right__contacts__social}
              onMouseOver={(e) => hoverSocialButtons(e)}
              onMouseLeave={(e) => unhoverSocialButtons(e)}
            >
              <a
                href="https://github.com/YassineGallaoui"
                rel="noreferrer noopener"
                target="_blank"
              >
              </a>
                <div className={styles.frameContainer__right__contacts__social__text+" contactsSocial"}>
                  <span>
                    {"Code"}
                  </span>
                </div>
                <Image
                  src={githubIcon}
                  fill
                  alt="github"
                  className="invertImg"
                />
            </div> */}
        </div>
      </div>
    </div>
  );
}