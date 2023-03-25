import {useEffect, useState} from "react";
import styles from '../styles/Home.module.css'
import { parallax, scrollHorizontal } from "../utility";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import { projectsDataset } from "./dataset";

export default function Home() {
  const [triangleRowsNumber, setTriangleRowsNumber] = useState<number>(0);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(0);
  const [imgContainerHover, setImgContainerHover] = useState<boolean>(false);
  const [tempImgHover, setTempImageHover] = useState<StaticImageData|null>(null);

  useEffect(() => {
    const expContainer = document.scrollingElement || document.documentElement;
    expContainer.addEventListener('wheel', scrollHorizontal);
    document.addEventListener("mousemove", parallax);

    setTriangleRowsNumber(Math.ceil(((window.innerHeight/300))/2));
    (Math.ceil((window.innerWidth/300)*2)+2)%2 === 1 ? 
    setTrianglesPerRow(Math.ceil((window.innerWidth/300)*2)+5) : setTrianglesPerRow(Math.ceil((window.innerWidth/300)*2)+4);
  }, [])

  useEffect(() => {
    console.log('UE');
    let projects = document.querySelectorAll('.triangleProjectImg');
    console.log('projects', projects);
    projects.forEach((el, index) => {
      console.log('el', el);
      el.addEventListener('mouseover', ()=>{
        const elementId = el.getAttribute('data-project-id');
        console.log(elementId);
        if(elementId != null) {
          setImgContainerHover(true);
          
          const elementData = projectsDataset.find(el=>el.id === elementId);
          console.log(elementId);
          console.log(elementData);
          setImgContainerHover(true);
          setTempImageHover(elementData.media[0]);
        }
      })
      el.addEventListener('mouseout', ()=>{
        setImgContainerHover(false);
        setTempImageHover(null);
      })
    })
  }, [trianglesPerRow])
  
  return (
    <>
      <Head>
        <title>Yassine | Software Engineer</title>
      </Head>
      <div className={styles.expBkgrdTxt+' sectionBkgrdTxt'}>Exp</div>
      <div className={styles.currentPrjHovered+' currentPrjHovered'}>
        {imgContainerHover && <Image src={tempImgHover} layout="fill" alt="project"></Image>}
        {/* {imgContainerHover && <div className={styles.currentPrjHovered}></div>} */}
      </div>
      <div className={styles.expContainer+' expContainer col-12'}>
        {triangleRowsNumber > 0 && [...Array(triangleRowsNumber).keys()].map((row, index) => {return(
          <div key={index} className={styles.triangleProjectRow+' '+styles.noProjRow}>
            {
              trianglesPerRow > 0 && [...Array(trianglesPerRow).keys()].map((cell, index2) => {return(
                <div key={index2} className={styles.triangleProjectWrapper__NoProj} style={{ '--index': ((index2+2) - (trianglesPerRow/2)) } as React.CSSProperties}>
                  <div className={styles.triangleProjectContent}>
                    {/* {imgContainerHover && <Image src={tempImgHover} layout="fill" alt="project"></Image>} */}
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
                      {/* {imgContainerHover && <Image src={tempImgHover} layout="fill" alt="project"></Image>} */}
                    </div>
                  </div>
                )
              } else {
                //setImgProjCount(imgProjCount+1);
                return(
                  <div key={index2} className={styles.triangleProjectWrapper} style={{ '--index': ((index2+2) - (trianglesPerRow/2)) } as React.CSSProperties}>
                    <div className={styles.triangleProjectContent+' triangleProjectImg'}data-project-id={projectsDataset[index2-((trianglesPerRow-4)/2)]?.id}>
                      {!imgContainerHover && <Image src={projectsDataset[index2-((trianglesPerRow-4)/2)]?.media[0]} layout="fill" alt="project"></Image>}
                      {imgContainerHover && tempImgHover==projectsDataset[index2-((trianglesPerRow-4)/2)]?.media[0] && <Image src={tempImgHover} layout="fill" alt="project" />}
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
                    {/* {imgContainerHover && <Image src={tempImgHover} layout="fill" alt="project"></Image>} */}
                  </div>
                </div>
              )})
            }
          </div>
        )}
        )}
      </div>
    </>
  )
}
