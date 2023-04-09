import {useCallback, useEffect, useState} from "react";
import styles from '../styles/scss/Home.module.scss'
import { parallax, scrollHorizontal } from "../utility";
import Head from "next/head";
import defaultImg from '../public/imgs/default.svg'
import Image, { StaticImageData } from "next/image";
import { projectsDataset } from "../dataset";
import gsap from 'gsap';
import ProjectModal from "../components/ProjectModal";

type HomeProps = {
  updateCursorText: Function,
  cursorIsHover: Function
}

export default function Home({updateCursorText, cursorIsHover}: HomeProps) {
  const [triangleRowsNumber, setTriangleRowsNumber] = useState<number>(0);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(0);
  const [tempImgHover, setTempImageHover] = useState<StaticImageData>(defaultImg);
  //const [projectOpened, setProjectOpened] = useState<Boolean>(false);
  const [projectOpened, setProjectOpened] = useState<any>(projectsDataset[0]);
  const [projectOpenedBoolean, setProjectOpenedBoolean] = useState<boolean>(false);
  

  useEffect(() => {
    const expContainer = document.scrollingElement || document.documentElement;
    expContainer.addEventListener('wheel', scrollHorizontal);
    document.addEventListener("mousemove", parallax);

    setTriangleRowsNumber(Math.ceil(((window.innerHeight/300))/2));
    (Math.ceil((window.innerWidth/300)*2)+2)%2 === 1 ? 
    setTrianglesPerRow(Math.ceil((window.innerWidth/300)*2)+5) : setTrianglesPerRow(Math.ceil((window.innerWidth/300)*2)+4);
  }, [])

  useEffect(() => {
    let projects = document.querySelectorAll('.triangleProjectImg');
    projects.forEach((el, index) => {
      el.addEventListener('mouseover', ()=>{
        const elementId = el.getAttribute('data-project-id');
        if(elementId != null) {
          const elementData = projectsDataset.find(el=>el.id+'' === elementId);
          setTempImageHover(elementData.media[0]);
          const tl1 = gsap.timeline({ delay: 0 });
          tl1.fromTo(
            '.bigBackgroundImage',
            { scale: 1.1, opacity: 0, },
            { scale: 1.02, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        }
      })
      el.addEventListener('mouseout', ()=>{
        const tl1 = gsap.timeline({ delay: 0 });
        tl1.fromTo(
          '.bigBackgroundImage',
          { scale: 1.02, opacity: 1, },
          { scale: 1.1, opacity: 0, duration: 1, ease: 'power3.out' }
        );
      })
    })
  }, [trianglesPerRow])

  const handleImageHover = (id: number) => {
    gsap.to(`#image-${id}`, { duration: 0.5, scale: 1.1 });
    gsap.to(`#see-more-even-${id}`, { duration: 0.5, delay: 0.8, opacity: 1 });
    gsap.to(`#see-more-odd-${id}`, { duration: 0.5, delay: 0.8, opacity: 1 });
    gsap.to(`.image:not(#image-${id})`, { duration: 0.5, scale: 0.95, opacity: 0, });
    cursorIsHover(true);
    updateCursorText('see more')
  };

  const handleImageLeave = (id: number) => {
    gsap.to(`#image-${id}`, { duration: 0.5, scale: 1 });
    gsap.to(`#see-more-even-${id}`, { duration: 0.5, delay: 0.8, opacity: 0, });
    gsap.to(`#see-more-odd-${id}`, { duration: 0.5, delay: 0.8, opacity: 0, });
    gsap.to('.image', { duration: 0.5, scale: 1, opacity: 1, });
    cursorIsHover(false);
    updateCursorText(null)
  };

  const handleImageClick = (id: number) => {
    const currentPrj = projectsDataset.find(el => el.id === id);
    setProjectOpened(currentPrj);
    setProjectOpenedBoolean(true);
    /* gsap.to(`#triangleProjectWrapper-${id}`, {
      position: 'fixed', width: '95vw', height:'95vh', backgroundColor:'white', 
      borderRadius: '30px', left: "50%", top: "50%", xPercent: -50, yPercent: -50, zIndex: '20'
    });
    gsap.to(`#triangleProjectContent-${id}`, {
      width: '50%', height:'100%', clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    });
    gsap.to(`#triangleProjectContent-${id} img`, {
      borderRadius: '30px'
    }); */
  }

  useEffect(() => {
    if(projectOpenedBoolean) {
      gsap.to(`.modalMatteBkgrd`, {background: 'rgba(0,0,0,0.8)', zIndex: '5'});
    } else {
      gsap.to(`.modalMatteBkgrd`, {background: 'rgba(0,0,0,0)', zIndex: '-1'});
    }
  },  [projectOpenedBoolean])

  return (
    <>
      <Head>
        <title>Yassine | Software Engineer</title>
      </Head>
      <div className={styles.expBkgrdTxt+' sectionBkgrdTxt'}>Exp</div>
      <div className={styles.currentPrjHovered+' currentPrjHovered '}>
        <Image className={'bigBackgroundImage'} src={tempImgHover} fill alt="project"></Image>
      </div>
      <div className={styles.modalMatteBkgrd+' modalMatteBkgrd'}>
      </div>
      <div className={styles.expContainer+' expContainer col-12'}>
        {triangleRowsNumber > 0 && [...Array(triangleRowsNumber).keys()].map((row, index) => {return(
          <div key={index} className={styles.triangleProjectRow+' '+styles.noProjRow}>
            {
              trianglesPerRow > 0 && [...Array(trianglesPerRow).keys()].map((cell, index2) => {return(
                <div key={index2} className={styles.triangleProjectWrapper__NoProj} style={{ '--index': ((index2+2) - (trianglesPerRow/2)) } as React.CSSProperties}>
                  <div className={styles.triangleProjectContent}>
                  </div>
                </div>
              )})
            }
          </div>
        )}
        )}
        <div className={styles.triangleProjectRow}>
          {
            trianglesPerRow > 0 && [...Array(trianglesPerRow).keys()].map((cell, index2) => {
              if(index2<(trianglesPerRow-4)/2 || index2>=(trianglesPerRow+4)/2 ){
                return(
                  <div key={index2} className={styles.triangleProjectWrapper__NoProj} style={{ '--index': ((index2+2) - (trianglesPerRow/2)) } as React.CSSProperties}>
                    <div className={styles.triangleProjectContent}>
                    </div>
                  </div>
                )
              } else {
                return(
                  <div key={index2}
                    className={styles.triangleProjectWrapper}
                    style={{ '--index': ((index2+2) - (trianglesPerRow/2)) } as React.CSSProperties}
                    id={`triangleProjectWrapper-${projectsDataset[index2-((trianglesPerRow-4)/2)]?.id}`}>
                    <div className={styles.triangleProjectContent+' triangleProjectImg'}
                      id={`triangleProjectContent-${projectsDataset[index2-((trianglesPerRow-4)/2)]?.id}`}
                      data-project-id={projectsDataset[index2-((trianglesPerRow-4)/2)]?.id}>
                      <Image
                        src={projectsDataset[index2-((trianglesPerRow-4)/2)]?.media[0]}
                        id={`image-${projectsDataset[index2-((trianglesPerRow-4)/2)]?.id}`}
                        className={'image'}
                        fill
                        alt="project"
                        onMouseOver={() => handleImageHover(projectsDataset[index2-((trianglesPerRow-4)/2)]?.id)}
                        onMouseLeave={() => handleImageLeave(projectsDataset[index2-((trianglesPerRow-4)/2)]?.id)}
                        onClick={() => handleImageClick(projectsDataset[index2-((trianglesPerRow-4)/2)]?.id)}
                        />
                      <div id={`see-more-${index2%2===1 ? 'odd':'even'}-${projectsDataset[index2-((trianglesPerRow-4)/2)]?.id}`}
                        className={styles.seeMoreText}>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
        {triangleRowsNumber > 0 && [...Array(triangleRowsNumber).keys()].map((row, index) => {return(
          <div key={index} className={styles.triangleProjectRow+' '+styles.noProjRow}>
            {
              trianglesPerRow > 0 && [...Array(trianglesPerRow).keys()].map((cell, index2) => {return(
                <div key={index2} className={styles.triangleProjectWrapper__NoProj} style={{ '--index': ((index2+2) - (trianglesPerRow/2)) } as React.CSSProperties}>
                  <div className={styles.triangleProjectContent}>
                  </div>
                </div>
              )})
            }
          </div>
        )}
        )}
      </div>
      <ProjectModal content={projectOpened} open={projectOpenedBoolean} updateOpen={setProjectOpenedBoolean}/>
    </>
  )
}
