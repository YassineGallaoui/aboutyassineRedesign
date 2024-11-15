import { animate } from "motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import arrRight from "../../public/icons/arr.svg";
import arrExpand from "../../public/icons/expand.svg";
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
  updateCursorText: Function;
  cursorIsHover: Function;
  expandedCarousel: boolean;
  setExpandedCarousel: Function;
}

function Carousel({
  content,
  open,
  updateCursorText,
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

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnVerticalRef = useRef(null);
  const nextBtnVerticalRef = useRef(null);
  const expandBtnRef = useRef(null);

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
      ? animate(expandBtnRef.current, { duration: 0.3, scale: 1 })
      : animate(expandBtnRef.current, { duration: 0.3, scale: 1.2 });
    cursorIsHover(true);
  };

  const expandBtnMouseLeave = () => {
    expandedCarousel
      ? animate(expandBtnRef.current, { duration: 0.3, scale: 1.2 })
      : animate(expandBtnRef.current, { duration: 0.3, scale: 1 });
    cursorIsHover(false);
  };

  const expandBtnClick = () => {
    setExpandedCarousel(!expandedCarousel);
  };

  const expandCarousel = async () => {
    await animate("#expandCarouselWrapper", {
      right: "3rem",
    }, { duration: 0.4, })
    await animate(expandBtnRef.current, { duration: 0, scale: 1.2 })
    await animate(
      ".upperControls",
      {
        height: "0rem",
      },
      { duration: 0.4, }
    )
    await animate(
      ".thumbnailControls",
      {
        y: 100,
        opacity: 0,
        height: 0,
      },
      { duration: 0.4, }
    )
    await animate(
      ".indexWrapper",
      {
        x: -40,
        opacity: 0,
      },
      { duration: 0.4, }
    )
    await animate(
      ".imageContainer",
      {
        height: "100%",
        gap: "1rem",
      },
      { duration: 0.4, }
    )
    await animate(
      ".imageStackContainer",
      {
        flex: "1 0 calc(90% - 1rem)",
      },
      { duration: 0.6, }
    )
    await animate(
      ".thumbnailControlsVertical",
      {
        opacity: 1,
        x: 0,
        flex: "1 0 10%",
      },
      { duration: 0.6, }
    );
  };

  const compressCarousel = async () => {
    await animate("#expandCarouselWrapper", {

      right: "0rem",
    }, { duration: 0.6, })
    animate(expandBtnRef.current, { duration: 0, scale: 1 })
    animate(
      ".thumbnailControlsVertical",
      {
        x: 100,
        opacity: 0,
        flex: "0 0 0",
      },
      { duration: 0.6, }
    )
    animate(
      ".upperControls",
      {
        height: "2rem",
      },
      { duration: 0.4, }
    )
    animate(
      ".imageStackContainer",
      {
        flex: "1 0 100%",
      },
      { duration: 0.6, }
    )
    animate(
      ".imageContainer",
      {
        height: "90%",
        gap: "0rem",
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
        y: 0,
        opacity: 1,
        height: "10%",
      },
      { duration: 0.4, }
    );
  };

  const prevBtnMouseOver = () => {
    animate(prevBtnRef.current, { x: -20 }, { duration: 0.2 });
    animate(prevBtnRef.current, { x: 20, y: 0 }, { duration: 0 });
    animate(prevBtnRef.current, { x: 0 });

    animate(prevBtnVerticalRef.current, { y: -20 }, { duration: 0.2 });
    animate(prevBtnVerticalRef.current, { y: 20, x: 0 }, { duration: 0 });
    animate(prevBtnVerticalRef.current, { y: 0 });
    cursorIsHover(true);
  };

  const nextBtnMouseOver = async () => {
    await animate(nextBtnRef.current, { x: 20 }, { duration: 0.2 });
    await animate(nextBtnRef.current, { x: -20, y: 0 }, { duration: 0 });
    await animate(nextBtnRef.current, { x: 0 });

    await animate(nextBtnVerticalRef.current, { y: 20 }, { duration: 0.2 });
    await animate(nextBtnVerticalRef.current, { y: -20, x: 0 }, { duration: 0 });
    await animate(nextBtnVerticalRef.current, { y: 0 });
    cursorIsHover(true);
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
      await animate(prevBtnVerticalRef.current, { y: -3 }, { duration: 0.2 });
      await animate(prevBtnVerticalRef.current, { y: 0 });
    } else {
      await animate(prevBtnRef.current, { x: -3 }, { duration: 0.2 });
      await animate(prevBtnRef.current, { x: 0 });
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
      await animate(nextBtnVerticalRef.current, { y: 3 }, { duration: 0.2 });
      await animate(nextBtnVerticalRef.current, { y: 0 });
    } else {
      await animate(nextBtnRef.current, { x: 3 }, { duration: 0.2 });
      await animate(nextBtnRef.current, { x: 0 });
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
          y: "-100%",
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
    <div className={styles.component + " carouselComponent"}>
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
          <Image
            id="arrExpand"
            ref={expandBtnRef}
            className={styles.arrExpand}
            src={arrExpand}
            alt={"expand"}
          ></Image>
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
                <Image src={el} alt={altText} fill sizes="50dvw" />
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
                <Image src={el} alt={altText} fill sizes="20dvh"></Image>
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
                <Image
                  id="arrLeft"
                  ref={prevBtnVerticalRef}
                  className={styles.arrLeftVertical}
                  src={arrRight}
                  alt={"previous"}
                ></Image>
              </div>
              <div
                className={styles.nextButtonVertical}
                onMouseOver={() => nextBtnMouseOver()}
                onMouseLeave={() => cursorIsHover(false)}
                onClick={() => nextBtnClick(true)}
              >
                <Image
                  id="arrRight"
                  ref={nextBtnVerticalRef}
                  className={styles.arrRightVertical}
                  src={arrRight}
                  alt={"previous"}
                ></Image>
              </div>
            </div>
          </div>
        </div>

      </div>

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
              <Image
                src={el}
                alt={altText}
                fill={true}
                sizes="20dvh"
              ></Image>
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
            <Image
              id="arrLeft"
              ref={prevBtnRef}
              className={styles.arrLeft}
              src={arrRight}
              alt={"previous"}
            ></Image>
          </div>
          <div
            className={styles.nextButton}
            onMouseOver={() => nextBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => nextBtnClick()}
          >
            <Image
              id="arrRight"
              ref={nextBtnRef}
              className={styles.arrRight}
              src={arrRight}
              alt={"previous"}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
