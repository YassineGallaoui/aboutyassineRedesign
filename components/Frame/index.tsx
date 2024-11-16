import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import cvIcon from "../../public/icons/CV.svg";
import linkedinIcon from "../../public/icons/linkedin.svg";
import mailIcon from "../../public/icons/mail.svg";
import xIcon from "../../public/icons/x.svg";
import logoY from "../../public/logo/logo-Y.svg";
import { themeMode } from "../../store/themeStore";
import { breakpoints } from "../../utils/breakpoints";
import { createSpanStructureV2 } from "../../utils/utility";
import Nav from "../Nav";
import ThemeSwitcher from "../ThemeSwitcher";
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
  useEffect(() => {
    const body = document.querySelector("body");
    const liTagsRB = body.querySelectorAll(".contactsSocialDiv");
    const sectionNamesRB = ["X", "Linkedin", "Mail", "Curriculum"];
    liTagsRB.forEach((element, index) => {
      element.innerHTML = createSpanStructureV2(sectionNamesRB[index]);
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
    <div id={"frameContainer"} className={styles.frameContainer}>
      <div className={styles.frameContainer__left}>
        <div
          className={
            styles.frameContainer__left__logoWrapper + " logoWrapper"
          }
          onMouseOver={() => updateCursorStatus(true)}
          onMouseLeave={() => updateCursorStatus(false)}
        >
          <Link href="/" aria-label="Click here to go to the homepage">
            <div className={styles.frameContainer__left__logoWrapper__logo}>
              <Image
                src={logoY}
                alt={`YAS`}
                className={styles.letterY + " invertImg"}
                fill
              />
            </div>
          </Link>
        </div>
        <div className={styles.frameContainer__left__booking + " booking"}>
          <a
            href="https://cal.com/yassine-gallaoui"
            rel="noreferrer noopener"
            target="_blank"
            aria-label="Click here to book a call and discuss about your next website"
            onMouseOver={() => updateCursorStatus(true)}
            onMouseLeave={() => updateCursorStatus(false)}
          >
            Book a call
          </a>
        </div>
        <div className={styles.frameContainer__left__available + " available"}>
          Available: 1st December 2024
        </div>
      </div>
      <div className={styles.frameContainer__right}>
        <ThemeSwitcher updateCursorStatus={updateCursorStatus} />
        <Nav updateCursorStatus={updateCursorStatus} />
        <div className={styles.frameContainer__right__contacts + " contacts"}>

          {/* X */}
          <div
            className={styles.frameContainer__right__contacts__social}
            onMouseOver={(e) => hoverSocialButtons(e)}
            onMouseLeave={(e) => unhoverSocialButtons(e)}
          >
            <a
              href="https://x.com/Yassine__G"
              rel="noreferrer noopener"
              target="_blank"
              aria-label="Click here to check my Twitter X profile"
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
              src={xIcon}
              fill
              alt="twitter X"
              className="invertImg"
            />
          </div>

          {/* LinkedIn */}
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

          {/* Mail */}
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

          {/* CV */}
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

        </div>
      </div>
    </div>
  );
}
