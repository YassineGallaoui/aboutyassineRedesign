import { animate } from "motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import arrRight from "../../public/icons/arr.svg";
import arrExpand from "../../public/icons/expand.svg";
import { Project } from "../../utils/dataset";
import {
  textAnimationBackward,
  textAnimationForward,
  verticalTextAnimationBackward,
  verticalTextAnimationForward,
} from "../../utils/utility";
import styles from "./CarouselMobile.module.scss";

interface CarouselProps {
  content: Project;
  open: boolean;
  expandedCarousel: boolean;
  setExpandedCarousel: Function;
}

function CarouselMobile({
  content,
  open,
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

  useEffect(() => {
    let imagesNumber = document.querySelectorAll(".indexWrapperToAnimate");
    setImageNumberSpanTags(imagesNumber);

    let verticalImagesNumber = document.querySelectorAll(
      ".verticalIndexWrapperToAnimate"
    );
    setVerticalImageNumberSpanTags(verticalImagesNumber);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0);
      goToImageIndex(0, "left");
    }, 200);
  }, [open]);

  const expandBtnClick = () => {
    setExpandedCarousel(!expandedCarousel);
    if (expandedCarousel) {
      animate("#arrExpand", { scale: 1 }, { duration: 0, });
    } else {
      animate("#arrExpand", { scale: 1.4 }, { duration: 0, });
    }
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
      await animate(prevBtnVerticalRef.current, { y: -3 }, { duration: 0.2 })
      await animate(prevBtnVerticalRef.current, { y: 0 });
    } else {
      await animate(prevBtnRef.current, { x: -3 }, { duration: 0.2 })
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
      await animate(nextBtnVerticalRef.current, { y: 3 }, { duration: 0.2, })
      await animate(nextBtnVerticalRef.current, { y: 0 })
    } else {
      await animate(nextBtnRef.current, { x: 3 }, { duration: 0.2, })
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

  const goToImageIndex = async (index, direction = null) => {
    setNewZIndexLevel(newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        await animate(`#image-${+ codeName + index}`, {
          x: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: 0,
        })
        await animate(`#image-${+ codeName + index}`, {
          x: "0%",
          opacity: 1,
        }, {
          ease: "easeOut",
          duration: 1,
        });
      } else {
        await animate(`#image-${+ codeName + index}`, {
          x: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: 0,
        })
        await animate(`#image-${+ codeName + index}`, {
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
        })
        await animate(`#image-${codeName + index}`, {
          y: "0%",
          opacity: 1,
        }, {
          duration: 1,
          ease: "easeOut",
        });
      } else {
        animate(`#image-${codeName + index}`, {
          y: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }, {
          duration: 0,
        })
        animate(`#image-${codeName + index}`, {
          y: "0%",
          opacity: 1,
        }, {
          duration: 1,
          ease: "easeOut",
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
          id={"#expandCarouselWrapper"}
          className={styles.expandCarouselWrapper}
          onClick={() => expandBtnClick()}
        >
          <Image
            id="arrExpand"
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
                <Image src={el} alt={altText} fill sizes="100dvw" />
              </div>
            );
          })}
        </div>

        {/* VERTICAL THUMBNAIL: THIS ACTIVATES ONLY WHEN THE CAROUSEL IS EXPANDED */}
        <div
          className={
            styles.thumbnailControlsVertical + " thumbnailControlsVertical"
          }
        >
          {/* immagini verticali */}
          <div className={styles.thumbnailsVertical + " thumbnailVertical"}>
            {images.map((el, index) => (
              <div
                key={index}
                className={
                  styles.singleThumbnailVertical +
                  " " +
                  (index === currentIndex ? styles.currentImg : "")
                }
                style={{
                  "--h": `${100 / images.length}%`,
                  "--ty": `${currentIndex * 100}%`,
                  "--i": `${images.length}`
                } as React.CSSProperties}
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

      {/* thumbnail: THIS ACTIVATES ONLY WHEN THE CAROUSEL IS NOT EXPANDED */}
      <div className={styles.thumbnailControls + " thumbnailControls"}>
        <div className={styles.thumbnails}>
          <div className={styles.thumbnailBorder}
            style={{
              "--w": `calc((100% - ${images.length - 4.6}rem) / ${images.length})`,
              "--ty": `calc(${currentIndex * 100}% + (${currentIndex} * 0.2rem) - (${currentIndex} * 4px) - 2px)`,
            } as React.CSSProperties}></div>
          {images.map((el, index) => (
            <div
              key={index}
              className={
                styles.singleThumbnail +
                " " +
                (index === currentIndex ? styles.currentImg : "")
              }
              onClick={() => thumbnailClickHandle(index)}
            >
              <Image src={el} alt={altText} fill sizes="20dvh"></Image>
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <div className={styles.prevButton} onClick={() => prevBtnClick()}>
            <Image
              id="arrLeft"
              ref={prevBtnRef}
              className={styles.arrLeft}
              src={arrRight}
              alt={"previous"}
            ></Image>
          </div>
          <div className={styles.nextButton} onClick={() => nextBtnClick()}>
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

export default CarouselMobile;
