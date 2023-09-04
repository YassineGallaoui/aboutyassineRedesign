import {useEffect, useRef, useState} from "react";
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
import githubIcon from '../../public/icons/github.svg'
import websiteLastUpdateDate from '../../websiteLastUpdateDate';
import gsap from "gsap";


export default function Frame({updateCursorText, updateCursorStatus}) {
    const [themeIconRot, setThemeIconRot] = useState(0);
    const tl = gsap.timeline({});

    const themeChange = (newMode) => {
        setThemeIconRot(themeIconRot+180);
        
        const body = document.querySelector("body");
        if(newMode === 'lightMode') {
            body.classList.add("lightMode");
            body.classList.remove("darkMode");
            localStorage.setItem('yas-theme-preference', 'lightMode');
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            body.classList.add("darkMode");
            body.classList.remove("lightMode");
            localStorage.setItem('yas-theme-preference', 'darkMode');
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }

    useEffect(() => {

      if (typeof window !== 'undefined') {
        const body = document.querySelector("body");
        // Check if dark mode is preferred by the user (system preference)
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
        // Function to set the theme preference class
        function setThemePreferenceClass(themePreference) {
          body.classList.remove('darkMode', 'lightMode');
          body.classList.add(themePreference);
          themePreference === 'darkMode' ? 
          document.documentElement.setAttribute("data-theme", "dark"):
          document.documentElement.setAttribute("data-theme", "light")

          themePreference === 'darkMode' && setThemeIconRot(themeIconRot+180);
        }
      
        // Check local storage for theme preference
        const storedThemePreference = localStorage.getItem('yas-theme-preference');
        if (storedThemePreference) {
          setThemePreferenceClass(storedThemePreference);
        } else {
          setThemePreferenceClass(prefersDarkMode ? 'darkMode' : 'lightMode');
        }
      }
      
      //menu navigation
      const body = document.querySelector("body");
      const liTags = body.querySelectorAll('.sectionsNav li div');
      const sectionNames = ['About','Career'];
      liTags.forEach((element, index) => {
          element.innerHTML = createSpanStructure(sectionNames[index]);
      })
    }, [])

  const hoverSocialButtons = (e) => {
    updateCursorStatus(true); 
    e.currentTarget.classList.add(styles.hovered)
  }

  const unhoverSocialButtons = (e) => {
    updateCursorStatus(false);
    e.currentTarget.classList.remove(styles.hovered)
  }

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
              onClick={() => themeChange("lightMode")}
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
              onClick={() => themeChange("darkMode")}
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
            <div
              className={styles.frameContainer__right__contacts__social}
              onMouseOver={(e) => hoverSocialButtons(e)}
              onMouseLeave={(e) => unhoverSocialButtons(e)}
            >
              <a href="/cv.pdf" rel="noreferrer noopener" target="_blank">
              </a>
                <div className={styles.frameContainer__right__contacts__social__text}>
                  <span>
                    {"Download"}
                  </span>
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
              <a href="mailto:myassine.gallaoui@gmail.com">
              </a>
                <div className={styles.frameContainer__right__contacts__social__text}>
                  <span>
                    {"Send"}
                  </span>
                </div>
                <Image
                  src={mailIcon}
                  fill
                  alt="mail"
                  className="invertImg"
                />
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
              </a>
                <div className={styles.frameContainer__right__contacts__social__text}>
                  <span>
                    {"More"}
                  </span>
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
                <div className={styles.frameContainer__right__contacts__social__text}>
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