import Head from 'next/head';
import {useEffect} from "react";
import { scrollHorizontal } from '../../utility';
import styles from '../../styles/Exp.module.css';
import VerticalSlider from '../../components/VerticalSlider/index';
import imgMaserati1 from '../../public/imgs/maserati-1.png'
import imgMaserati2 from '../../public/imgs/maserati-2.png'

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

  const DeloitteSlidesObj = [{'src':imgMaserati1, 'alt':'maserati-redesign-1'},{'src':imgMaserati2, 'alt':'maserati-redesign-2'}];
  const OUATSlidesObj = [{'src':imgMaserati1, 'alt':'maserati-redesign-1'},{'src':imgMaserati2, 'alt':'maserati-redesign-2'}];
  const UNIMISlidesObj = [{'src':imgMaserati1, 'alt':'maserati-redesign-1'},{'src':imgMaserati2, 'alt':'maserati-redesign-2'}];
  
  return (
    <>
      <Head>
        <title>Yassine | Software Engineer</title>
      </Head>
      <div className={styles.expBkgrdTxt}>Exp</div>
      <div className={styles.expContainer+' expContainer col-12'}>
        <section className="col-12">
          {ExpSingleSummary('Full Stack Dev @ Deloitte', 'Feb 2021 ~ currently', `From February 2022 till the end of the year I've worked on the redesign of the official website of the client, Maserati, company of luxury cars based in Italy.<br />
              Worked mainly on frontend side, using AEM (Adobe Experience Manager) and javascript.
              Main duties were bug fixing, CR implementation and, later, implementation of Maserati Owner Area.<br /> Since January 2023 I've worked for the website redesign of Autotorino, company specialized on the selling and refurbishment of endless types of vehicles.`)}
          <div className={styles.expSliderContainer+' offset-1 col-4'}>
            <VerticalSlider ariaLabel="Deloitte projects" direction="vertical" slides={DeloitteSlidesObj}/>
          </div>
        </section>
        <section className="col-12">
          {ExpSingleSummary('Frontend Dev @ Once Upon A Time Solutions SA','Feb 2020 ~ Sep 2020',`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`)}
          <div className={styles.expSliderContainer+' offset-1 col-4'}>
            <VerticalSlider ariaLabel="Once Upon A Time Solutions SA projects" direction="vertical" slides={OUATSlidesObj}/>
          </div>
        </section>
        <section className="col-12">
          {ExpSingleSummary('Full Stack Dev Intern @ University of Milan','Jun 2019 ~ Oct 2020',`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`)}
          <div className={styles.expSliderContainer+' offset-1 col-4'}>
            <VerticalSlider ariaLabel="UNIMI projects" direction="vertical" slides={UNIMISlidesObj}/>
          </div>
        </section>
      </div>
    </>
  )
}