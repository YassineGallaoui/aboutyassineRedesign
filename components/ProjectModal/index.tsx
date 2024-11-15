import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import linkArrow from "../../public/icons/linkArrow.svg";
import { breakpoints, getDeviceType } from "../../utils/breakpoints";
import { Project } from "../../utils/dataset";
import Carousel from "../Carousel";
import styles from "./ProjectModal.module.scss";

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
  cursorIsHover,
}: ModalProps) {
  const [expandedCarousel, setExpandedCarousel] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState(breakpoints.desktop);
  const arrowLinkRef = useRef(null);
  const tl = gsap.timeline({});

  useEffect(() => {
    const changeDeviceType = () => {
      setDeviceType(getDeviceType())
    }
    window.addEventListener("resize", changeDeviceType);

    return () => {
      window.removeEventListener("resize", changeDeviceType)
    }
  }, []);

  useEffect(() => {
    if (open) {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        height: "90vh",
        borderRadius: "2.5rem",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
      });
    } else {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        height: "0vh",
        borderRadius: "0rem",
        left: "50%",
        top: "-50%",
        xPercent: -50,
        yPercent: 0,
        opacity: 0,
      });
    }
  }, [open]);

  const closeModal = () => {
    updateOpen(false);
    setTimeout(() => {
      setExpandedCarousel(false);
    }, 200);
  };

  const hoverCloseBtn = () => {
    cursorIsHover(true);
    gsap.to(`.closeModalBtn`, { transform: "rotate(-90deg)" });
  };

  const notHoverCloseBtn = () => {
    cursorIsHover(false);
    gsap.to(`.closeModalBtn`, { transform: "rotate(0deg)" });
  };

  const arrowLinkMouseOver = () => {
    tl.to(arrowLinkRef.current, { duration: 0.2, x: 20, y: -20 })
      .to(arrowLinkRef.current, { duration: 0, x: -20, y: 20 })
      .to(arrowLinkRef.current, { x: 0, y: 0 });
    cursorIsHover(true);
  };

  useEffect(() => {
    const projectCarouselWrapper = document.querySelector(
      ".projectCarouselWrapper",
    );
    const descriptionWrapper = document.querySelector(
      ".projectModalDescriptionWrapper",
    );
    const closeModalBtn = document.querySelector(".closeModalBtn");

    if (expandedCarousel) {
      gsap.to(descriptionWrapper, {
        duration: 0.6,
        opacity: 0,
        x: 100,
        flex: 0,
        padding: 0,
      });
      gsap.to(projectCarouselWrapper, {
        duration: 0.3,
        borderRightWidth: 0,
      });
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
        padding: "1rem",
      });
      gsap.to(projectCarouselWrapper, {
        duration: 0.3,
        borderWidth: "1px",
      });
      gsap.to(closeModalBtn, {
        duration: 0.3,
        filter: "invert(0)",
      });
    }
  }, [expandedCarousel]);

  return (
    <div className={styles.projectModalContainer + " projectModalContainer"}>
      <div
        id="projectCarouselWrapper"
        className={styles.projectCarouselWrapper + " projectCarouselWrapper"}
      >
        <Carousel
          content={content}
          open={open}
          updateCursorText={updateCursorText}
          cursorIsHover={cursorIsHover}
          expandedCarousel={expandedCarousel}
          setExpandedCarousel={setExpandedCarousel}
        ></Carousel>
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
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Employer"}</span>
                </th>
                <td>{content.workingFor}</td>
              </tr>
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Year"}</span>
                </th>
                <td>{content.year}</td>
              </tr>
              <tr className={styles.descriptionTitle}>
                <th
                  colSpan={2}
                  className={styles.characteristic + " characteristic"}
                >
                  <span>{"Description"}</span>
                </th>
              </tr>
              <tr
                className={
                  styles.bottomBorder + " bottomBorder " + styles.description
                }
              >
                <td colSpan={2}>{content.description}</td>
              </tr>
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Frontend"}</span>
                </th>
                <td>{content.frontend}</td>
              </tr>
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Backend"}</span>
                </th>
                <td>{content.backend}</td>
              </tr>
              {content.recognitions != null && (
                <tr>
                  <th className={styles.characteristic + " characteristic"}>
                    <span>{"Recognitions"}</span>
                  </th>
                  <td>{content.recognitions}</td>
                </tr>
              )}
            </tbody>
          </table>
          {content.link != null && (
            <a
              type="button"
              className={styles.projectModalLink}
              aria-label="Click this link to go to the project's website"
              href={content.link}
              onMouseOver={() => arrowLinkMouseOver()}
              onMouseLeave={() => cursorIsHover(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                id="arrRight"
                ref={arrowLinkRef}
                className={styles.linkArrow}
                src={linkArrow}
                alt={""}
                role="presentation"
              ></Image>
            </a>
          )}
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
