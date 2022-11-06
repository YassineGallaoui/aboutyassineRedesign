import Head from 'next/head'
import {useEffect} from "react";
import { scrollHorizontal } from '../../utility'
import styles from '../../styles/Exp.module.css'

export default function Exp() {
  useEffect(() => {
    const expContainer = document.scrollingElement || document.documentElement;

    expContainer.addEventListener('wheel', scrollHorizontal);
  }, [])

  const ExpSingleSummary = function(title, subtitle, description) {
    return(
      <div className={'col-4 offset-2'}>
            <h1 className={styles.expContainer__title}>
              {title}
            </h1>
            <h2 className={styles.expContainer__subtitle}>
              {subtitle}
            </h2>
            <hr></hr>
            <p className={styles.expContainer__desc}  dangerouslySetInnerHTML={{ __html: description }}>
            </p>
          </div>
    )
  }

  return (
    <>
      <Head>
        <title>Yassine | Software Engineer</title>
      </Head>
      <div className={styles.expBkgrdTxt}>Exp</div>
      <div className={styles.expContainer+' expContainer col-12'}>
        <section className="col-12">
          {ExpSingleSummary('Full Stack Dev @ Deloitte', 'Feb 2021 ~ currently', `Worked on the redesign of the official website of the client, Maserati, company of luxury cars based in Italy.<br />
              Worked mainly on frontend side, using AEM (Adobe Experience Manager) and javascript.
              Main duties were bug fixing, CR implementation and, later, implementation of Maserati Owner Area.`)}
          <div className={'offset-1 col-5'}>
            slider
          </div>
        </section>
        <section className="col-12">
          {ExpSingleSummary('Frontend Dev @ Once Upon A Time','Feb 2020 ~ Sep 2020',`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`)}
          <div className={'offset-1 col-5'}>
            slider
          </div>
        </section>
        <section className="col-12">
          {ExpSingleSummary('Full Stack Dev Intern @ University of Milan','Jun 2019 ~ Oct 2020',`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`)}
          <div className={'offset-1 col-5'}>
            slider
          </div>
        </section>
      </div>
    </>
  )
}