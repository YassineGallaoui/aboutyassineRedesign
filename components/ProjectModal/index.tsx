/* eslint-disable @next/next/no-img-element */
import { animate, easeInOut, easeOut } from "motion";
import { useEffect, useState } from "react";
import linkArrow from "../../public/icons/linkArrow.svg";
import { breakpoints } from "../../utils/breakpoints";
import { Project } from "../../utils/dataset";
import Carousel from "../Carousel";
import { RotateDevice } from "../RotateDevice";
import styles from "./ProjectModal.module.scss";

type ModalProps = {
  content: Project;
  open: boolean;
  updateOpen: Function;
  cursorIsHover: Function;
  deviceType: breakpoints;
};

export default function ProjectModal({
  content,
  open,
  updateOpen,
  cursorIsHover,
  deviceType,
}: ModalProps) {
  const [expandedCarousel, setExpandedCarousel] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(deviceType === breakpoints.mobileSmall || deviceType === breakpoints.mobile);

  useEffect(() => {
    setIsMobile(deviceType === breakpoints.mobileSmall || deviceType === breakpoints.mobile);
  }, [deviceType])

  useEffect(() => {
    if (open) {
      animate(`.projectModalContainer`, {
        position: "fixed",
        borderRadius: "2.5rem",
        x: "-50%",
        y: "-50%",
        scaleY: 1,
        opacity: 1,
      }, {
        duration: 0.6,
        ease: easeInOut,
      });
    } else {
      animate(`.projectModalContainer`, {
        position: "fixed",
        borderRadius: "0rem",
        x: "-50%",
        y: "-200%",
        scaleY: 0,
        opacity: 0,
      }, {
        duration: 0.6,
        ease: easeOut,
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
    animate(`#closeModalBtn`, { transform: "rotate(-90deg)" });
  };

  const notHoverCloseBtn = () => {
    cursorIsHover(false);
    animate(`#closeModalBtn`, { transform: "rotate(0deg)" });
  };

  const arrowLinkMouseOver = async () => {
    await animate('#arrLink', {
      x: 25,
      y: -25
    }, {
      duration: 0.2,
    })
    await animate('#arrLink', {
      x: -25,
      y: 25
    }, {
      duration: 0,
    })
    await animate('#arrLink', {
      x: 0,
      y: 0
    }, {
      duration: 0.2,
    })
    cursorIsHover(true);
  };

  useEffect(() => {
    if (isMobile) {
      if (expandedCarousel) {
        animate("#projectCarouselWrapper", {
          borderRightWidth: 0,
          borderBottomWidth: 0,
          maxWidth: "100%",
          maxHeight: "50%",
        }, {
          duration: 0.4
        });
      } else {
        animate("#projectCarouselWrapper", {
          borderRightWidth: 0,
          borderBottomWidth: 1,
          maxWidth: "100%",
          maxHeight: "50%",
        }, {
          duration: 0.4,
        });
      }
    } else {
      if (expandedCarousel) {
        animate("#projectCarouselWrapper", {
          borderRightWidth: 0,
          maxWidth: "100%",
          maxHeight: "100%",
        }, {
          duration: 0.4
        });
      } else {
        animate("#projectCarouselWrapper", {
          borderWidth: "1px",
          maxWidth: "50%",
          maxHeight: "100%",
        }, {
          duration: 0.4,
        });
      }
    }
  }, [expandedCarousel, isMobile]);

  return (
    <div className={styles.projectModalContainer + " " + (isMobile ? styles.isMobile : '') + " projectModalContainer"}>
      <div
        id="projectCarouselWrapper"
        className={styles.projectCarouselWrapper + " " + (isMobile ? styles.isMobile : '') + " projectCarouselWrapper"}
      >
        <Carousel
          content={content}
          open={open}
          cursorIsHover={isMobile ? cursorIsHover : null}
          expandedCarousel={expandedCarousel}
          setExpandedCarousel={setExpandedCarousel}
          isMobile={isMobile}
        ></Carousel>
      </div>
      <div
        id={"projectModalDescriptionWrapper"}
        className={
          styles.projectModalDescriptionWrapper + " " + (isMobile ? styles.isMobile : '') +
          " projectModalDescriptionWrapper " + (isMobile ? " projectModalVerticalDescriptionWrapper " : '')
        }
      >
        <div className={styles.projectDescriptionComponent + " " + (isMobile ? styles.isMobile : '')}>
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
              <img
                id="arrLink"
                className={styles.linkArrow}
                src={linkArrow.src}
                alt={""}
                role="presentation"
              ></img>
            </a>
          )}
        </div>
      </div>
      <div
        id={"closeModalBtn"}
        className={
          `${styles.closeModalBtn} 
          ${expandedCarousel ? styles.expanded : ""} 
          ${isMobile ? styles.isMobile : ""} `
        }
        onMouseOver={() => hoverCloseBtn()}
        onMouseLeave={() => notHoverCloseBtn()}
        onClick={() => closeModal()}
      />
      {isMobile &&
        <RotateDevice
          showComponent={expandedCarousel}
          animationFinished={setExpandedCarousel}
        ></RotateDevice>}
    </div>
  );
}
