import {useEffect} from "react";
import styles from '../../styles/Frame.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import lightIcon from '../../public/icons/light_mode.svg'
import darkIcon from '../../public/icons/dark_mode.svg'
import cvIcon from '../../public/icons/CV.svg'
import mailIcon from '../../public/icons/mail.svg'
import linkedinIcon from '../../public/icons/linkedin.svg'
import githubIcon from '../../public/icons/github.svg'

export default function Frame() {
    useEffect(() => {
        const body = document.querySelector("body");
        const lightModeIcon = document.querySelector(".lightModeIcon");
        const darkModeIcon = document.querySelector(".darkModeIcon");
        lightModeIcon.addEventListener('click', (event) => {
            console.log('hai cliccato su light icon');
            lightModeIcon.style.display = 'none';
            darkModeIcon.style.display = 'block';
            body.classList.add("lightMode");
            body.classList.remove("darkMode");
          });
        darkModeIcon.addEventListener('click', (event) => {
            console.log('hai cliccato su dark icon')
            lightModeIcon.style.display = 'block';
            darkModeIcon.style.display = 'none';
            body.classList.remove("lightMode");
            body.classList.add("darkMode");
          });
      }, [])

    return (
        <div className={styles.frameContainer}>
            <div className={styles.frameContainer__left}>
                <Link href="/">
                    <div className={styles.frameContainer__left__logo}>
                        <Image
                            src={logo}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="logo"
                        />
                    </div>
                </Link>
                <div className={styles.frameContainer__left__lastUpdate}>
                    Last update: 23 Oct 2022
                </div>
            </div>
            <div className={styles.frameContainer__right}>
                <div className={styles.frameContainer__right__theme}>
                    <div className={styles.frameContainer__right__theme__light+" lightModeIcon"}>
                        <Image
                            src={lightIcon}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="light mode"
                        />
                    </div>
                    <div className={styles.frameContainer__right__theme__dark+" darkModeIcon"}>
                        <Image
                            src={darkIcon}
                            layout='fill'
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt="dark mode"
                        />
                    </div>
                </div>
                <div className={styles.frameContainer__right__nav}>
                    <ul>
                        <li>
                            <span>Who am I</span>
                        </li>
                        <li>
                            <span>What I do</span>
                        </li>
                        <li>
                            <span>How I do it</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.frameContainer__right__contacts}>
                    <a href="https://en.wikipedia.org/wiki/Next.js">
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
                    <a href="https://www.linkedin.com/in/mohamed-yassine-gallaoui/">
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
                    <a href="https://github.com/YassineGallaoui">
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