/* eslint-disable @next/next/no-img-element */
import { animate } from "motion";
import React, { useEffect, useState } from "react";
import { buttonsClickDurTime, buttonsDurTime, expandDurTime, nextSlideDurTime } from "../../pages";
import arrBottom from "../../public/icons/arrow-bottom.svg";
import arrTop from "../../public/icons/arrow-top.svg";
import arrExpand from "../../public/icons/expand.svg";
import arrLeft from "../../public/icons/left-arrow.svg";
import arrRight from "../../public/icons/right-arrow.svg";
import { Project } from "../../utils/dataset";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  content: Project;
  open: boolean;
  cursorIsHover: Function;
  expandedCarousel: boolean;
  setExpandedCarousel: Function;
  isMobile: boolean;
}


export function textAnimationForward(el) {
  animate([
    [el, { x: "0.8rem" }, { duration: 0.25 }],
    [el, { x: "-0.8rem" }, { duration: 0 }],
    [el, { x: 0 }, { duration: 0.25 }]
  ])
}

export function textAnimationBackward(el) {
  animate([
    [el, { x: "-0.8rem" }, { duration: 0.25 }],
    [el, { x: "0.8rem" }, { duration: 0 }],
    [el, { x: 0 }, { duration: 0.25 }]
  ])
}

export function verticalTextAnimationForward(el) {
  animate([
    [el, { y: "1.5rem" }, { duration: 0.25 }],
    [el, { y: "-1.5rem" }, { duration: 0, }],
    [el, { y: "0px" }, { duration: 0.25, }]
  ])
}

export function verticalTextAnimationBackward(el) {
  animate([
    [el, { y: "-1.5rem" }, { duration: 0.25 }],
    [el, { y: "1.5rem" }, { duration: 0, }],
    [el, { y: "0px" }, { duration: 0.25, }]
  ])
}

function Carousel({
  content,
  open,
  cursorIsHover,
  expandedCarousel,
  setExpandedCarousel,
  isMobile,
}: CarouselProps) {
  const codeName = content.codeName;
  const images = content.media;
  const altText = content.name + " for " + content.workingFor;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageNumberSpanTags, setImageNumberSpanTags] =
    useState<NodeListOf<Element>>();
  const [verticalImageNumberSpanTags, setVerticalImageNumberSpanTags] =
    useState<NodeListOf<Element>>();
  const [newZIndexLevel, setNewZIndexLevel] = useState(5);

  useEffect(() => {
    let imagesNumber = document.querySelectorAll(".indexWrapperToAnimate");
    setImageNumberSpanTags(imagesNumber);

    let verticalImagesNumber = document.querySelectorAll(
      ".verticalIndexWrapperToAnimate",
    );
    setVerticalImageNumberSpanTags(verticalImagesNumber);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0);
      goToImageIndex(0, "left");
    }, 200);
  }, [open]);

  useEffect(() => {
    if (expandedCarousel) {
      expandCarousel();
    } else {
      compressCarousel();
    }
  }, [expandedCarousel, isMobile])

  const expandBtnMouseOver = () => {
    expandedCarousel
      ? animate("#arrExpand", { scale: 1 }, { duration: buttonsDurTime, })
      : animate("#arrExpand", { scale: 1.2 }, { duration: buttonsDurTime, });
    cursorIsHover(true);
  };

  const expandBtnMouseLeave = () => {
    expandedCarousel
      ? animate("#arrExpand", { scale: 1.2 }, { duration: buttonsDurTime, })
      : animate("#arrExpand", { scale: 1 }, { duration: buttonsDurTime, });
    cursorIsHover(false);
  };

  const expandBtnClick = () => {
    setExpandedCarousel(!expandedCarousel);
  };

  const expandCarousel = async () => {
    if (isMobile) {
      animate("#expandCarouselWrapper", {
        x: "1rem"
      }, {
        duration: expandDurTime
      })
      animate("#arrExpand", {
        scale: 1.2
      }, {
        duration: 0
      })
      animate(
        ".imageStackContainer",
        {
          maxWidth: "100%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".thumbnailControlsVertical",
        {
          x: 110,
          opacity: 0,
          maxWidth: "0%",
        },
        { duration: expandDurTime, }
      );
    } else {
      animate("#carouselComponent", {
        gap: 0
      }, {
        duration: expandDurTime,
      })
      animate("#expandCarouselWrapper", {
        x: "-3rem"
      }, {
        duration: expandDurTime
      })
      animate("#arrExpand", {
        scale: 1.2
      }, {
        duration: 0
      })
      animate(
        ".thumbnailControls",
        {
          y: "110%",
          opacity: 0,
          maxHeight: "0%",
          minHeight: "0rem",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".indexWrapper",
        {
          x: -40,
          opacity: 0,
        },
        { duration: expandDurTime, }
      )
      animate(
        ".upperControls",
        {
          maxHeight: "0rem",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".imageContainer",
        {
          gap: "1rem",
          maxHeight: "100%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".imageStackContainer",
        {
          maxWidth: "85%",
          maxHeight: "100%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".thumbnailControlsVertical",
        {
          x: 0,
          opacity: 1,
          maxWidth: "15%",
        },
        { duration: expandDurTime, }
      );
    }
  };

  const compressCarousel = async () => {
    if (isMobile) {
      animate("#expandCarouselWrapper", {
        x: "1rem",
      }, { duration: expandDurTime, })
      animate("#arrExpand", { scale: 1 }, { duration: 0, })
      animate("#carouselComponent", {
        gap: "0rem"
      }, {
        duration: expandDurTime,
      })
      animate(
        ".upperControls",
        {
          maxHeight: "2rem",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".thumbnailControlsVertical",
        {
          x: "105%",
          opacity: 0,
          maxWidth: "0%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".imageContainer",
        {
          gap: "0rem",
          maxHeight: "90%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".imageStackContainer",
        {
          maxWidth: "100%",
          maxHeight: "90%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".indexWrapper",
        {
          x: 0,
          opacity: 1,
        },
        { duration: expandDurTime, }
      )
      animate(
        ".thumbnailControls",
        {
          y: "0%",
          opacity: 1,
          maxHeight: "10%",
          minHeight: "2rem",
        },
        { duration: expandDurTime, }
      );
    } else {
      animate("#carouselComponent", {
        gap: "1rem"
      }, {
        duration: expandDurTime,
      })
      animate("#expandCarouselWrapper", {
        x: "0rem",
      }, { duration: expandDurTime, })
      animate("#arrExpand", { scale: 1 }, { duration: 0, })
      animate(
        ".thumbnailControlsVertical",
        {
          x: "105%",
          opacity: 0,
          maxWidth: "0%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".upperControls",
        {
          maxHeight: "2rem",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".imageContainer",
        {
          gap: "0rem",
          maxHeight: "90%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".imageStackContainer",
        {
          maxWidth: "100%",
          maxHeight: "90%",
        },
        { duration: expandDurTime, }
      )
      animate(
        ".indexWrapper",
        {
          x: 0,
          opacity: 1,
        },
        { duration: expandDurTime, }
      )
      animate(
        ".thumbnailControls",
        {
          y: "0%",
          opacity: 1,
          maxHeight: "10%",
          minHeight: "2rem",
        },
        { duration: expandDurTime, }
      );
    }
  };

  const prevBtnMouseOver = async () => {
    cursorIsHover(true);
    await animate('#arrLeft', { x: [0, -25] }, { duration: buttonsDurTime, ease: "easeOut" })
    animate('#arrLeft', { x: [25, 0] }, { duration: buttonsDurTime, ease: "easeOut" })

    await animate('#arrTop', { y: [0, -25] }, { duration: buttonsDurTime, ease: "easeOut" })
    animate('#arrTop', { y: [25, 0] }, { duration: buttonsDurTime, ease: "easeOut" })
  };

  const nextBtnMouseOver = async () => {
    cursorIsHover(true);
    await animate('#arrRight', { x: [0, 25] }, { duration: buttonsDurTime, ease: "easeOut" })
    animate('#arrRight', { x: [-25, 0] }, { duration: buttonsDurTime, ease: "easeOut" })

    await animate('#arrBottom', { y: [0, 25] }, { duration: buttonsDurTime, ease: "easeOut" })
    animate('#arrBottom', { y: [-25, 0] }, { duration: buttonsDurTime, ease: "easeOut" })
  };

  const prevBtnClick = async (vertical) => {
    imageNumberSpanTags.forEach((el, index) => {
      if (index > 0)
        textAnimationForward(el);
    });

    verticalImageNumberSpanTags.forEach((el, index) => {
      if (index > 0)
        verticalTextAnimationBackward(el);
    });

    if (vertical)
      goToImageIndexVertical(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1,
        "left",
      );
    else
      goToImageIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1,
        "left",
      );

    if (vertical) {
      await animate("#arrTop", { y: "-3px" }, { duration: buttonsClickDurTime });
      animate("#arrTop", { y: 0 });
    } else {
      await animate("#arrLeft", { x: "-3px" }, { duration: buttonsClickDurTime });
      animate("#arrLeft", { x: 0 });
    }
  };

  const nextBtnClick = async (vertical) => {
    imageNumberSpanTags.forEach((el, index) => {
      if (index > 0)
        textAnimationBackward(el);
    });

    verticalImageNumberSpanTags.forEach((el, index) => {
      if (index > 0)
        verticalTextAnimationForward(el);
    });

    if (vertical)
      goToImageIndexVertical(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1,
        "right",
      );
    else
      goToImageIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1,
        "right",
      );

    if (vertical) {
      await animate("#arrBottom", { y: "3px" }, { duration: buttonsClickDurTime });
      animate("#arrBottom", { y: 0 }, { duration: buttonsClickDurTime });
    } else {
      await animate("#arrRight", { x: "3px" }, { duration: buttonsClickDurTime });
      animate("#arrRight", { x: 0 }, { duration: buttonsClickDurTime });
    }
  };

  const thumbnailClickHandle = (imageIndex: number, vertical) => {
    if (imageIndex != currentIndex) {
      imageNumberSpanTags.forEach((el, index) => {
        if (index > 0)
          imageIndex > currentIndex
            ? textAnimationBackward(el)
            : textAnimationForward(el);
      });
      verticalImageNumberSpanTags.forEach((el, index) => {
        if (index > 0)
          imageIndex > currentIndex
            ? verticalTextAnimationBackward(el)
            : verticalTextAnimationForward(el);
      });

      if (vertical)
        goToImageIndexVertical(imageIndex);
      else
        goToImageIndex(imageIndex);
    }
  };

  const goToImageIndex = async (index: number, direction: string | null = null) => {
    setNewZIndexLevel((newZIndexLevel) => newZIndexLevel + 1);

    if (index !== currentIndex) {
      setCurrentIndex(index);

      const isRight =
        direction === "right" ||
        (direction == null &&
          (index > currentIndex || (currentIndex === images.length - 1 && index === 0)));

      if (isRight) {
        animate(`#image-${codeName}${index}`, {
          x: ["100%", "0%"],
          y: 0,
          scale: [1.2, 1],
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: nextSlideDurTime,
        });
      } else {
        animate(`#image-${codeName}${index}`, {
          x: ["-100%", "0%"],
          y: 0,
          scale: [1.2, 1],
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: nextSlideDurTime,
        });
      }
    }
  };

  const goToImageIndexVertical = async (index, direction = null) => {
    setNewZIndexLevel((newZIndexLevel) => newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        animate(`#image-${codeName + index}`, {
          y: ["100%", "0%"],
          x: 0,
          scale: [1.2, 1],
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: nextSlideDurTime,
        });
      } else {
        animate(`#image-${codeName + index}`, {
          y: ["-100%", "0%"],
          x: 0,
          scale: [1.2, 1],
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: nextSlideDurTime,
        });
      }
    }
  };

  return (
    <div id="carouselComponent" className={`${styles.carouselComponent} carouselComponent ${isMobile ? styles.isMobile : ""}`}>
      <div className={`${styles.upperControls} upperControls ${isMobile ? styles.isMobile : ""}`}>
        <div className={styles.indexWrapper + " indexWrapper"}>
          <div>
            <span>
              <span className={"indexWrapperToAnimate"}>{"0"}</span>
            </span>
            <span>
              <span className={"indexWrapperToAnimate"}>{currentIndex + 1}</span>
            </span>
          </div>
          <div>
            <span>0{content.media.length}</span>
          </div>
        </div>

        <button
          id="expandCarouselWrapper"
          className={styles.expandCarouselWrapper}
          onMouseOver={() => expandBtnMouseOver()}
          onMouseLeave={() => expandBtnMouseLeave()}
          onClick={() => expandBtnClick()}
          tabIndex={open ? 0 : -1}
        >
          <img
            id="arrExpand"
            className={styles.arrExpand}
            src={arrExpand.src}
            alt={"expand"}
          ></img>
        </button>
      </div>

      <div className={styles.imageContainer + " imageContainer"}>
        <div className={styles.imageStackContainer + " imageStackContainer"}>
          {images.map((el, index) => {
            return (
              <div
                id={"image-" + codeName + index}
                className={styles.imageDiv}
                key={index}
                style={{ zIndex: 5 - index }}
              >
                <img className={styles.imageDiv__image} src={el.src} alt={altText} />
              </div>
            );
          })}
        </div>

        {/* VERTICAL CONTORLS */}
        <div
          className={
            styles.thumbnailControlsVertical + " thumbnailControlsVertical"
          }
        >
          {/* immagini verticali */}
          <ul className={styles.thumbnailsVertical}>
            <div className={styles.thumbnailBorder}
              style={{
                "--h": `calc((100% - ${images.length - 1}rem) / ${images.length})`,
                "--ty": `calc(${currentIndex * 100}% + (${currentIndex} * 1rem) - (${currentIndex} * 10px) - 5px)`,
              } as React.CSSProperties}></div>
            {images.map((el, index) => (
              <li
                key={index}
                tabIndex={expandedCarousel && open ? 0 : -1}
                aria-label={`image ${index + 1}`}
                className={
                  styles.singleThumbnailVertical +
                  " " +
                  (index === currentIndex ? styles.currentImg : "")
                }
                style={{ "--h": `${100 / images.length}%` } as React.CSSProperties}
                onClick={() => thumbnailClickHandle(index, true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    thumbnailClickHandle(index, false);
                  }
                }}
              >
                <img src={el.src} alt={altText} />
              </li>
            ))}
          </ul>
          {/* numero slide e frecce */}
          <div className={styles.verticalNumberAndArrows}>
            <div
              className={styles.verticalIndexWrapper + " verticalIndexWrapper"}
            >
              <div>
                <span>
                  <span className={"verticalIndexWrapperToAnimate"}>{"0"}</span>
                </span>
                <span>
                  <span className={"verticalIndexWrapperToAnimate"}>
                    {currentIndex + 1}
                  </span>
                </span>
              </div>
              <div>
                <span>0{content.media.length}</span>
              </div>
            </div>
            <div className={styles.controlsVertical}>
              <button
                tabIndex={expandedCarousel && open ? 0 : -1}
                aria-label="go to previous carousel image"
                className={styles.prevButtonVertical}
                onMouseOver={() => prevBtnMouseOver()}
                onMouseLeave={() => cursorIsHover(false)}
                onClick={() => prevBtnClick(true)}
                style={{ pointerEvents: expandedCarousel ? "all" : "none" }}
              >
                <img
                  id="arrTop"
                  className={styles.arrTop}
                  src={arrTop.src}
                  alt={"previous"}
                ></img>
              </button>
              <button
                tabIndex={expandedCarousel && open ? 0 : -1}
                aria-label="go to next carousel image"
                className={styles.nextButtonVertical}
                onMouseOver={() => nextBtnMouseOver()}
                onMouseLeave={() => cursorIsHover(false)}
                onClick={() => nextBtnClick(true)}
                style={{ pointerEvents: expandedCarousel ? "all" : "none" }}
              >
                <img
                  id="arrBottom"
                  className={styles.arrBottom}
                  src={arrBottom.src}
                  alt={"previous"}
                ></img>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* HORIZONTAL CONTROLS */}
      <div className={styles.thumbnailControls + " thumbnailControls"}>
        <ul className={styles.thumbnails}>
          <div className={styles.thumbnailBorder}
            style={{
              "--w": isMobile ?
                `calc((100% - ${images.length - 4.6}rem) / ${images.length})` :
                `calc((100% - ${images.length - 1}rem) / ${images.length})`,
              "--ty": isMobile ?
                `calc(${currentIndex * 100}% + (${currentIndex} * 0.2rem) - (${currentIndex} * 4px) - 2px)` :
                `calc(${currentIndex * 100}% + (${currentIndex} * 1rem) - (${currentIndex} * 8px) - 4px)`,
            } as React.CSSProperties}></div>
          {images.map((el, index) => (
            <li
              key={index}
              tabIndex={!expandedCarousel && open ? 0 : -1}
              aria-label={`image ${index + 1}`}
              className={
                styles.singleThumbnail +
                " " +
                (index === currentIndex ? styles.currentImg : "")
              }
              onMouseOver={() => cursorIsHover(true)}
              onMouseLeave={() => cursorIsHover(false)}
              onClick={() => thumbnailClickHandle(index, false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  thumbnailClickHandle(index, false);
                }
              }}
            >
              <img
                src={el.src}
                alt={altText}
              />
            </li>
          ))}
        </ul>
        <div className={styles.controls}>
          <button
            tabIndex={!expandedCarousel && open ? 0 : -1}
            aria-label="go to previous carousel image"
            className={styles.prevButton}
            onMouseOver={() => prevBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => prevBtnClick(false)}
            style={{ pointerEvents: expandedCarousel ? "none" : "all" }}
          >
            <img
              id="arrLeft"
              className={styles.arrLeft}
              src={arrLeft.src}
              alt={"previous"}
            ></img>
          </button>
          <button
            tabIndex={!expandedCarousel && open ? 0 : -1}
            aria-label="go to next carousel image"
            className={styles.nextButton}
            onMouseOver={() => nextBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => nextBtnClick(false)}
            style={{ pointerEvents: expandedCarousel ? "none" : "all" }}
          >
            <img
              id="arrRight"
              className={styles.arrRight}
              src={arrRight.src}
              alt={"previous"}
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
