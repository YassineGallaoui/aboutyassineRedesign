import Head from 'next/head'
import {useEffect} from "react";
import { scrollHorizontal } from '../../utility'
import styles from '../../styles/Skills.module.css'

export default function Skills() {
  useEffect(() => {
    const expContainer = document.scrollingElement || document.documentElement;

    expContainer.addEventListener('wheel', scrollHorizontal);
  }, [])

  return (
    <>
      <Head>
        <title>Yassine | Software Engineer</title>
      </Head>
      <div className={styles.skillsBkgrdTxt}>Skills</div>
      <div className={styles.skillsContainer+'  col-12'}>
        <section className='col-8 offset-2'>
          <h1>Web Dev</h1>
          <hr></hr>
          <div>
            <h2>Expertise</h2>
            <div className={styles.skillsList}>
              <div>Javascript</div>
              <div>HTML</div>
              <div>CSS/SCSS</div>
              <div>Bootstrap</div>
              <div>jQuery</div>
              <div>git</div>
            </div>
          </div>
          <div>
            <h2>Great Knowledge</h2>
            <div className={styles.skillsList}>
              <div>React</div>
              <div>NextJS</div>
            </div>
          </div>
          <div>
            <h2>General Knowledge</h2>
            <div className={styles.skillsList}>
              <div>AEM</div>
              <div>MongoDB</div>
              <div>ExpressJS</div>
              <div>NodeJS</div>
              <div>php</div>
              <div>postgreSQL</div>
              <div>Wordpress</div>
            </div>
          </div>
        </section>
        <section className='col-8 offset-4'>
          <h1>Mobile Dev (and more)</h1>
          <hr></hr>
          <div>
            <h2>Great Knowledge</h2>
            <div className={styles.skillsList}>
              <div>Android Studio</div>
              <div>PhoneGap</div>
              <div>Java</div>
            </div>
          </div>
          <div>
            <h2>General Knowledge</h2>
            <div className={styles.skillsList}>
              <div>C</div>
            </div>
          </div>
        </section>
        <section className='col-8 offset-4'>
          <h1>Content Creation</h1>
          <hr></hr>
          <div>
            <h2>Great Knowledge</h2>
            <div className={styles.skillsList}>
              <div>Illustrator</div>
              <div>Premiere</div>
              <div>Da Vinci Resolve</div>
            </div>
          </div>
          <div>
            <h2>General Knowledge</h2>
            <div className={styles.skillsList}>
              <div>Photoshop</div>
              <div>After Effects</div>
            </div>
          </div>
        </section>
        <section className='col-8 offset-4'>
          <h1>Languages</h1>
          <hr></hr>
          <div>
            <h2>Native Language</h2>
            <div className={styles.skillsList}>
              <div>Italian</div>
              <div>Arabic</div>
            </div>
          </div>
          <div>
            <h2>Professional Knowledge</h2>
            <div className={styles.skillsList}>
              <div>English</div>
            </div>
          </div>
          <div>
            <h2>Conversational Knowledge</h2>
            <div className={styles.skillsList}>
              <div>French</div>
            </div>
          </div>
        </section>
        <div className='offset-2'>/</div>
      </div>
    </>
  )
}