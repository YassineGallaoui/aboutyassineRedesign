import {useEffect, useRef, useState} from "react";
import styles from './Frame.module.scss'
import { createSpanStructure } from '../../utility'
import Link from 'next/link'
import Image from 'next/image'
import logoY from '../../public/logo/logo-Y.svg'
import logoA from '../../public/logo/logo-A.svg'
import logoS from '../../public/logo/logo-S.svg'
import lightIcon from '../../public/icons/light_mode.svg'
import lightIconBase from '../../public/icons/light_mode_base.svg'
import darkIcon from '../../public/icons/dark_mode.svg'
import darkIconStars1 from '../../public/icons/dark_mode_stars_1.svg'
import darkIconStars2 from '../../public/icons/dark_mode_stars_2.svg'
import cvIcon from '../../public/icons/CV.svg'
import mailIcon from '../../public/icons/mail.svg'
import linkedinIcon from '../../public/icons/linkedin.svg'
import githubIcon from '../../public/icons/github.svg'
import websiteLastUpdateDate from '../../websiteLastUpdateDate';
import gsap from "gsap";


export default function Frame({updateCursorText, updateCursorStatus}) {
    const [themeIconRot, setThemeIconRot] = useState(0);
    const tl = gsap.timeline({});

    const themeChange = (newMode:'light'|'dark') => {
        setThemeIconRot(themeIconRot+180);
        
        const body = document.querySelector("body");
        if(newMode === 'light') {
            body.classList.add("lightMode");
            body.classList.remove("darkMode");
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            body.classList.add("darkMode");
            body.classList.remove("lightMode");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }

    useEffect(() => {
        //menu navigation
        const body = document.querySelector("body");
        const liTags = body.querySelectorAll('.sectionsNav li div');
        const sectionNames = ['About','Career'];
        liTags.forEach((element, index) => {
            element.innerHTML = createSpanStructure(sectionNames[index]);
        })
      }, [])

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
          >
            <div
              className={
                styles.frameContainer__right__theme__light + " lightModeIcon"
              }
              onClick={() => themeChange("light")}
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
              onClick={() => themeChange("dark")}
            >
              <Image
                src={darkIcon}
                fill
                alt="dark mode"
                className="invertImg"
              />
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
            <a href="/cv.pdf" rel="noreferrer noopener" target="_blank">
              <div
                className={styles.frameContainer__right__contacts__social}
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
              >
                <Image
                  src={cvIcon}
                  fill
                  alt="my curriculum vitae"
                  className="invertImg"
                />
              </div>
            </a>
            <a href="mailto:myassine.gallaoui@gmail.com">
              <div
                className={styles.frameContainer__right__contacts__social}
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
              >
                <Image
                  src={mailIcon}
                  fill
                  alt="mail"
                  className="invertImg"
                />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-yassine-gallaoui/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <div
                className={styles.frameContainer__right__contacts__social}
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
              >
                <Image
                  src={linkedinIcon}
                  fill
                  alt="linkedin"
                  className="invertImg"
                />
              </div>
            </a>
            <a
              href="https://github.com/YassineGallaoui"
              rel="noreferrer noopener"
              target="_blank"
            >
              <div
                className={styles.frameContainer__right__contacts__social}
                onMouseOver={() => updateCursorStatus(true)}
                onMouseLeave={() => updateCursorStatus(false)}
              >
                <Image
                  src={githubIcon}
                  fill
                  alt="github"
                  className="invertImg"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
}