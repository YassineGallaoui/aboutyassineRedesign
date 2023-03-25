import {useEffect, useState, useRef} from "react";
import styles from '../../styles/Frame.module.css'
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

export default function Frame() {
    const [themeIconRot, setThemeIconRot] = useState(0);
    const [firstTime, setFirstTime] = useState(true);

    const themeChange = () => {
        setThemeIconRot(themeIconRot+180);
    }

    useEffect(() => {
        const body = document.querySelector("body");  
        const lightModeIcon = document.querySelector(".lightModeIcon");
        const darkModeIcon = document.querySelector(".darkModeIcon");

        function themeHandle(option) {
            if(option === 'light'){
                body.classList.add("lightMode");
                body.classList.remove("darkMode");
            } else {
                body.classList.add("darkMode");
                body.classList.remove("lightMode");
            }
            document.documentElement.setAttribute("color-scheme", option);
        }
        if(firstTime) {
            lightModeIcon.addEventListener('click', () => themeHandle('light'));
            darkModeIcon.addEventListener('click', () => themeHandle('dark'));
            setFirstTime(false);
        }
        
        //menu navigation
        const liTags = body.querySelectorAll('.sectionsNav li div');
        const sectionNames = ['About','Career'];
        liTags.forEach((element, index) => {
            element.innerHTML = createSpanStructure(sectionNames[index]);
        })
      }, [firstTime])

    return (
        <div className={styles.frameContainer}>
            <div className={styles.frameContainer__left}>
                <Link href="/">
                    <div className={styles.frameContainer__left__logo}>
                        <Image src={logoY} alt={`YAS`} className={styles.letterY}/>
                        <Image src={logoA} alt={`YAS`} className={styles.letterA}/>
                        <Image src={logoS} alt={`YAS`} className={styles.letterS}/>
                    </div>
                </Link>
                <div className={styles.frameContainer__left__lastUpdate}>
                    Last update: 23 Oct 2022
                </div>
            </div>
            <div className={styles.frameContainer__right}>
                <div className={styles.frameContainer__right__theme+' themeContainer'} style={{ transform: 'rotate('+themeIconRot+'deg)' }}>
                    <div className={styles.frameContainer__right__theme__light+" lightModeIcon"}
                            onClick={themeChange}>
                        <Image
                            src={lightIconBase}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="light mode"
                        />
                        <Image
                            className={styles.firstSun}
                            src={lightIcon}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="light mode"
                        />
                        <Image
                            className={styles.secondSun}
                            src={lightIcon}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="light mode"
                        />
                        <Image
                            className={styles.thirdSun}
                            src={lightIcon}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="light mode"
                        />
                    </div>
                    <div className={styles.frameContainer__right__theme__dark+" darkModeIcon"}
                            onClick={themeChange}>
                        <Image
                            src={darkIcon}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="dark mode"
                        />
                        <Image
                            className={styles.moonStars1}
                            src={darkIconStars1}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="dark mode"
                        />
                        
                        <Image
                            className={styles.moonStars2}
                            src={darkIconStars2}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="dark mode"
                        />
                    </div>
                </div>
                <div className={styles.frameContainer__right__nav + ' sectionsNav'}>
                    <ul>
                        <Link href="/about">
                            <li>
                                <div></div>
                            </li>
                        </Link>
                        <Link href="/">
                            <li>
                                <div></div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className={styles.frameContainer__right__contacts}>
                    <a href="/cv.pdf" rel="noreferrer noopener" target="_blank">
                        <div className={styles.frameContainer__right__contacts__social}>
                            <Image
                                src={cvIcon}
                                layout='fill'
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                alt="my curriculum vitae"
                                />
                        </div>
                    </a>
                    <a href="mailto:myassine.gallaoui@gmail.com">
                        <div className={styles.frameContainer__right__contacts__social}>
                            <Image
                                src={mailIcon}
                                layout='fill'
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                alt="mail"
                            />
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/mohamed-yassine-gallaoui/" rel="noreferrer noopener" target="_blank">
                        <div className={styles.frameContainer__right__contacts__social}>
                            <Image
                                src={linkedinIcon}
                                layout='fill'
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                alt="linkedin"
                            />
                        </div>
                    </a>
                    <a href="https://github.com/YassineGallaoui" rel="noreferrer noopener" target="_blank">
                        <div className={styles.frameContainer__right__contacts__social}>
                            <Image
                                src={githubIcon}
                                layout='fill'
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                alt="github"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}