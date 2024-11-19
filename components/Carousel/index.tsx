/* eslint-disable @next/next/no-img-element */
import { animate } from "motion";
import React, { useEffect, useState } from "react";
import arrBottom from "../../public/icons/arrow-bottom.svg";
import arrTop from "../../public/icons/arrow-top.svg";
import arrExpand from "../../public/icons/expand.svg";
import arrLeft from "../../public/icons/left-arrow.svg";
import arrRight from "../../public/icons/right-arrow.svg";
import { Project } from "../../utils/dataset";
import {
  textAnimationBackward,
  textAnimationForward,
  verticalTextAnimationBackward,
  verticalTextAnimationForward,
} from "../../utils/utility";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  content: Project;
  open: boolean;
  cursorIsHover: Function;
  expandedCarousel: boolean;
  setExpandedCarousel: Function;
}

function Carousel({
  content,
  open,
  cursorIsHover,
  expandedCarousel,
  setExpandedCarousel,
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
  }, [expandedCarousel])

  const expandBtnMouseOver = () => {
    expandedCarousel
      ? animate("#arrExpand", { scale: 1 }, { duration: 0.3, })
      : animate("#arrExpand", { scale: 1.2 }, { duration: 0.3, });
    cursorIsHover(true);
  };

  const expandBtnMouseLeave = () => {
    expandedCarousel
      ? animate("#arrExpand", { scale: 1.2 }, { duration: 0.3, })
      : animate("#arrExpand", { scale: 1 }, { duration: 0.3, });
    cursorIsHover(false);
  };

  const expandBtnClick = () => {
    setExpandedCarousel(!expandedCarousel);
  };

  const expandCarousel = async () => {
    animate("#expandCarouselWrapper", {
      x: "-3rem"
    }, {
      duration: 0.4
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
        maxHeight: 0,
      },
      { duration: 0.4, }
    )
    animate(
      ".indexWrapper",
      {
        x: -40,
        opacity: 0,
      },
      { duration: 0.4, }
    )
    animate(
      ".imageContainer",
      {
        gap: "1rem",
        maxHeight: "100%",
      },
      { duration: 0.4, }
    )
    animate(
      ".imageStackContainer",
      {
        maxWidth: "90%",
      },
      { duration: 0.4, }
    )
    animate(
      ".thumbnailControlsVertical",
      {
        x: 0,
        opacity: 1,
        maxWidth: "10%",
      },
      { duration: 0.4, }
    );
  };

  const compressCarousel = async () => {
    animate("#expandCarouselWrapper", {
      x: "0rem",
    }, { duration: 0.4, })
    animate("#arrExpand", { scale: 1 }, { duration: 0, })
    animate(
      ".thumbnailControlsVertical",
      {
        x: "105%",
        opacity: 0,
        maxWidth: "0%",
      },
      { duration: 0.4, }
    )
    animate(
      ".imageContainer",
      {
        gap: "0rem",
        maxHeight: "calc(90% - 1rem)",
      },
      { duration: 0.4, }
    )
    animate(
      ".imageStackContainer",
      {
        maxWidth: "100%",
      },
      { duration: 0.4, }
    )
    animate(
      ".indexWrapper",
      {
        x: 0,
        opacity: 1,
      },
      { duration: 0.4, }
    )
    animate(
      ".thumbnailControls",
      {
        y: "0%",
        opacity: 1,
        maxHeight: "10%",
      },
      { duration: 0.4, }
    );
  };

  const prevBtnMouseOver = async () => {
    cursorIsHover(true);
    await animate("#arrLeft", { x: -40 }, { duration: 0.2 });
    await animate("#arrLeft", { x: 40 }, { duration: 0 });
    await animate("#arrLeft", { x: 0 }, { duration: 0.2 });

    await animate("#arrTop", { y: -40 }, { duration: 0.2 });
    await animate("#arrTop", { y: 40 }, { duration: 0 });
    await animate("#arrTop", { y: 0 }, { duration: 0.2 });
  };

  const nextBtnMouseOver = async () => {
    cursorIsHover(true);
    await animate("#arrRight", { x: 40 }, { duration: 0.2 });
    await animate("#arrRight", { x: -40 }, { duration: 0 });
    await animate("#arrRight", { x: 0 }, { duration: 0.2 });

    await animate("#arrBottom", { y: 40 }, { duration: 0.2 });
    await animate("#arrBottom", { y: -40 }, { duration: 0 });
    await animate("#arrBottom", { y: 0 }, { duration: 0.2 });
  };

  const prevBtnClick = async (vertical = null) => {
    imageNumberSpanTags.forEach((el, index) => {
      textAnimationForward(el, index + 1);
    });

    verticalImageNumberSpanTags.forEach((el, index) => {
      verticalTextAnimationForward(el, index + 1);
    });

    setTimeout(() => {
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
    }, 200);

    if (vertical) {
      animate("#arrTop", { y: -3 }, { duration: 0.2 });
      animate("#arrTop", { y: 0 });
    } else {
      animate("#arrLeft", { x: -3 }, { duration: 0.2 });
      animate("#arrLeft", { x: 0 });
    }
  };

  const nextBtnClick = async (vertical = null) => {
    imageNumberSpanTags.forEach((el, index) => {
      textAnimationBackward(el, index + 1);
    });

    verticalImageNumberSpanTags.forEach((el, index) => {
      verticalTextAnimationBackward(el, index + 1);
    });

    setTimeout(() => {
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
    }, 200);
    if (vertical) {
      animate("#arrBottom", { y: 3 }, { duration: 0.2 });
      animate("#arrBottom", { y: 0 }, { duration: 0.2 });
    } else {
      await animate("#arrRight", { x: 3 }, { duration: 0.2 });
      await animate("#arrRight", { x: 0 }, { duration: 0.2 });
    }
  };

  const thumbnailClickHandle = (imageIndex: number, vertical = null) => {
    if (imageIndex != currentIndex) {
      imageNumberSpanTags.forEach((el, index) => {
        imageIndex > currentIndex
          ? textAnimationBackward(el, index + 1)
          : textAnimationForward(el, index + 1);
      });
      verticalImageNumberSpanTags.forEach((el, index) => {
        imageIndex > currentIndex
          ? verticalTextAnimationBackward(el, index + 1)
          : verticalTextAnimationForward(el, index + 1);
      });

      setTimeout(() => {
        if (vertical) goToImageIndexVertical(imageIndex);
        else goToImageIndex(imageIndex);
      }, 200);
    }
  };

  const goToImageIndex = async (index: number, direction: string | null = null) => {
    setNewZIndexLevel(newZIndexLevel + 1);

    if (index !== currentIndex) {
      setCurrentIndex(index);

      const isRight =
        direction === "right" ||
        (direction == null &&
          (index > currentIndex || (currentIndex === images.length - 1 && index === 0)));

      if (isRight) {
        await animate(`#image-${codeName}${index}`, {
          x: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,

        }, { duration: 0, });
        await animate(`#image-${codeName}${index}`, {
          x: "0%",
          opacity: 1,
        }, {
          ease: "easeOut",
          duration: 1,
        });
      } else {
        await animate(`#image-${codeName}${index}`, {
          x: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: 0,
        });
        await animate(`#image-${codeName}${index}`, {
          x: "0%",
          opacity: 1,
        }, {
          ease: "easeOut",
          duration: 1,
        });
      }
    }
  };

  const goToImageIndexVertical = async (index, direction = null) => {
    setNewZIndexLevel(newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        await animate(`#image-${codeName + index}`, {
          y: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {

          duration: 0,
        });
        await animate(`#image-${codeName + index}`, {
          y: "0%",
          opacity: 1,
        }, {

          ease: "easeOut",
          duration: 1,
        });
      } else {
        await animate(`#image-${codeName + index}`, {
          x: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {

          duration: 0,
        });
        await animate(`#image-${codeName + index}`, {
          y: "0%",
          opacity: 1,
        }, {

          ease: "easeOut",
          duration: 1,
        });
      }
    }
  };

  return (
    <div className={styles.carouselComponent + " carouselComponent"}>
      <div className={styles.upperControls + " upperControls"}>
        <div className={styles.indexWrapper + " indexWrapper"}>
          <span>
            <span className={"indexWrapperToAnimate"}>{"0"}</span>
          </span>
          <span>
            <span className={"indexWrapperToAnimate"}>{currentIndex + 1}</span>
          </span>
        </div>

        <div
          id="expandCarouselWrapper"
          className={styles.expandCarouselWrapper}
          onMouseOver={() => expandBtnMouseOver()}
          onMouseLeave={() => expandBtnMouseLeave()}
          onClick={() => expandBtnClick()}
        >
          <img
            id="arrExpand"
            className={styles.arrExpand}
            src={arrExpand.src}
            alt={"expand"}
          ></img>
        </div>
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
                <img src={el.src} alt={altText} />
              </div>
            );
          })}
        </div>

        {/* THIS ACTIVATES ONLY WHEN THE CAROUSEL IS EXPANDED */}
        <div
          className={
            styles.thumbnailControlsVertical + " thumbnailControlsVertical"
          }
        >
          {/* immagini verticali */}
          <div className={styles.thumbnailsVertical + " thumbnailVertical"}>
            <div className={styles.thumbnailBorder}
              style={{
                "--h": `calc((100% - ${images.length - 1}rem) / ${images.length})`,
                "--ty": `calc(${currentIndex * 100}% + (${currentIndex} * 1rem) - (${currentIndex} * 10px) - 5px)`,
              } as React.CSSProperties}></div>
            {images.map((el, index) => (
              <div
                key={index}
                className={
                  styles.singleThumbnailVertical +
                  " " +
                  (index === currentIndex ? styles.currentImg : "")
                }
                style={{ "--h": `${100 / images.length}%` } as React.CSSProperties}
                onClick={() => thumbnailClickHandle(index, true)}
              >
                <img src={el.src} alt={altText} />
              </div>
            ))}
          </div>
          {/* numero slide e frecce */}
          <div className={styles.verticalNumberAndArrows}>
            <div
              className={styles.verticalIndexWrapper + " verticalIndexWrapper"}
            >
              <span>
                <span className={"verticalIndexWrapperToAnimate"}>{"0"}</span>
              </span>
              <span>
                <span className={"verticalIndexWrapperToAnimate"}>
                  {currentIndex + 1}
                </span>
              </span>
            </div>
            <div className={styles.controlsVertical}>
              <div
                className={styles.prevButtonVertical}
                onMouseOver={() => prevBtnMouseOver()}
                onMouseLeave={() => cursorIsHover(false)}
                onClick={() => prevBtnClick(true)}
              >
                <img
                  id="arrTop"
                  className={styles.arrTop}
                  src={arrTop.src}
                  alt={"previous"}
                ></img>
              </div>
              <div
                className={styles.nextButtonVertical}
                onMouseOver={() => nextBtnMouseOver()}
                onMouseLeave={() => cursorIsHover(false)}
                onClick={() => nextBtnClick(true)}
              >
                <img
                  id="arrBottom"
                  className={styles.arrBottom}
                  src={arrBottom.src}
                  alt={"previous"}
                ></img>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* horizontal controls */}
      <div className={styles.thumbnailControls + " thumbnailControls"}>
        <div className={styles.thumbnails}>
          <div className={styles.thumbnailBorder}
            style={{
              "--w": `calc((100% - ${images.length - 1}rem) / ${images.length})`,
              "--ty": `calc(${currentIndex * 100}% + (${currentIndex} * 1rem) - (${currentIndex} * 8px) - 4px)`,
            } as React.CSSProperties}></div>
          {images.map((el, index) => (
            <div
              key={index}
              className={
                styles.singleThumbnail +
                " " +
                (index === currentIndex ? styles.currentImg : "")
              }
              onMouseOver={() => cursorIsHover(true)}
              onMouseLeave={() => cursorIsHover(false)}
              onClick={() => thumbnailClickHandle(index)}
            >
              <img
                src={el.src}
                alt={altText}
              />
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <div
            className={styles.prevButton}
            onMouseOver={() => prevBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => prevBtnClick()}
          >
            <img
              id="arrLeft"
              className={styles.arrLeft}
              src={arrLeft.src}
              alt={"previous"}
            ></img>
          </div>
          <div
            className={styles.nextButton}
            onMouseOver={() => nextBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => nextBtnClick()}
          >
            <img
              id="arrRight"
              className={styles.arrRight}
              src={arrRight.src}
              alt={"previous"}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
