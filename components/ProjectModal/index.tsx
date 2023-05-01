import { useEffect, useState } from "react";
import styles from "./ProjectModal.module.scss"
import gsap from 'gsap';
import ThreeCarousel from "../Carousel";
import { Project } from "../../dataset";

type ModalProps = {
  content: Project;
  open: boolean;
  updateOpen: Function;
  updateCursorText: Function;
  cursorIsHover: Function;
};

export default function ProjectModal({
  content,
  open,
  updateOpen,
  updateCursorText,
  cursorIsHover}: ModalProps) {
  const [carouselSectionWidth, setCarouselSectionWidth] = useState<number | null>(null);
  const [carouselSectionHeight, setCarouselSectionHeight] = useState<number | null>(null);
  const [expandedCarousel, setExpandedCarousel] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        width: "90vw",
        height: "90vh",
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: "30px",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: "20",
        opacity: 1,
      });
      setTimeout(() => {
        setCarouselSectionWidth(
          document.getElementById("projectCarouselWrapper").offsetWidth
        );
        setCarouselSectionHeight(
          document.getElementById("projectCarouselWrapper").offsetHeight
        );
      }, 550);
    } else {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        height: "0vh",
        backgroundColor: "rgba(255,255,255,0)",
        borderRadius: "0px",
        left: "50%",
        top: "-50%",
        xPercent: -50,
        yPercent: 0,
        zIndex: "20",
        opacity: 0,
      });
    }
  }, [open]);

  const closeModal = () => {
    updateOpen(false);
  };

  const hoverCloseBtn = () => {
    cursorIsHover(true);
    gsap.to(`.closeModalBtn`, { transform: "rotate(-90deg)" });
  };

  const notHoverCloseBtn = () => {
    cursorIsHover(false);
    gsap.to(`.closeModalBtn`, { transform: "rotate(0deg)" });
  };

  useEffect(()=>{
    const descriptionWrapper = document.querySelector('.projectModalDescriptionWrapper');
    const closeModalBtn = document.querySelector(".closeModalBtn");
    const fadeEffectBox = document.querySelector('.fadeEffectBox') as HTMLElement;
    if(expandedCarousel){
      fadeEffectBox.style.backgroundImage = 'none';
      gsap.to(descriptionWrapper, {
        duration: 0.6,
        opacity: 0,
        x: 100,
        flex: 0,
        padding: 0,
      })
      gsap.to(closeModalBtn, {
        delay: 0.3,
        duration: 0.3,
        filter: "invert(1)",
      });
    } else {
      gsap.to(descriptionWrapper, {
        duration: 0.6,
        opacity: 1,
        x: 0,
        flex: 1,
        padding: '1rem',
      })
      gsap.to(closeModalBtn, {
        duration: 0.3,
        filter: "invert(0)",
      });
      setTimeout(() => {
        fadeEffectBox.style.backgroundImage = 'linear-gradient(0deg, white, transparent)';
      }, 650); 
    }
  }, [expandedCarousel])

  return (
    <div className={styles.projectModalContainer + " projectModalContainer"}>
      <div
        id="projectCarouselWrapper"
        className={styles.projectCarouselWrapper}
      >
        <ThreeCarousel
          content={content}
          updateCursorText={updateCursorText}
          cursorIsHover={cursorIsHover}
          expandedCarousel={expandedCarousel}
          setExpandedCarousel={setExpandedCarousel}
        ></ThreeCarousel>
      </div>
      <div
        className={
          styles.projectModalDescriptionWrapper +
          " projectModalDescriptionWrapper"
        }
      >
        <div className={styles.projectDescriptionComponent}>
          <div className={styles.projectModalName}>{content.name}</div>
          <table>
            <tbody>
              <tr className={styles.bottomBorder}>
                <td className={styles.characteristic}>{"Working for"}</td>
                <td>{content.workingFor}</td>
              </tr>
              <tr aria-rowspan={2} className={styles.descriptionTitle}>
                <td colSpan={2} className={styles.characteristic}>
                  {"Description"}
                </td>
              </tr>
              <tr className={styles.bottomBorder + " " + styles.description}>
                <td colSpan={2}>{content.description}</td>
              </tr>
              <tr className={styles.bottomBorder}>
                <td className={styles.characteristic}>{"Frontend"}</td>
                <td>{content.frontend}</td>
              </tr>
              <tr>
                <td className={styles.characteristic}>{"Backend"}</td>
                <td>{content.backend}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.fadeEffect + " fadeEffectBox"}></div>
        </div>
      </div>
      <div
        className={
          styles.closeModalBtn +
          (expandedCarousel ? " " + styles.light : "") +
          " closeModalBtn"
        }
        onMouseOver={() => hoverCloseBtn()}
        onMouseLeave={() => notHoverCloseBtn()}
        onClick={() => closeModal()}
      />
    </div>
  );
}