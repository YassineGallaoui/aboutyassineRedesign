import gsap from "gsap";
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
  updateCursorText: Function;
  cursorIsHover: Function;
  expandedCarousel: boolean;
  setExpandedCarousel: Function;
}

function CarouselMobile({
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
  const tl = gsap.timeline({});
  const tl2 = gsap.timeline({});
  const tl3 = gsap.timeline({});

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
      tl.to(expandBtnRef.current, { duration: 0, scale: 1 });
    } else {
      tl.to(expandBtnRef.current, { duration: 0, scale: 1.4 });
    }
  };

  const prevBtnClick = (vertical = null) => {
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

    if (vertical)
      tl3
        .to(prevBtnVerticalRef.current, { duration: 0.2, y: -3 })
        .to(prevBtnVerticalRef.current, { y: 0 });
    else
      tl3
        .to(prevBtnRef.current, { duration: 0.2, x: -3 })
        .to(prevBtnRef.current, { x: 0 });
  };

  const nextBtnClick = (vertical = null) => {
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
    if (vertical)
      tl3
        .to(nextBtnVerticalRef.current, { duration: 0.2, y: 3 })
        .to(nextBtnVerticalRef.current, { y: 0 });
    else
      tl3
        .to(nextBtnRef.current, { duration: 0.2, x: 3 })
        .to(nextBtnRef.current, { x: 0 });
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

  const goToImageIndex = (index, direction = null) => {
    const imageToGo = document.querySelector("#image-" + codeName + index);
    setNewZIndexLevel(newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        tl.to(imageToGo, {
          duration: 0,
          x: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }).to(imageToGo, {
          duration: 1,
          x: "0%",
          opacity: 1,
          ease: "expo.out",
        });
      } else {
        tl.to(imageToGo, {
          duration: 0,
          x: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }).to(imageToGo, {
          duration: 1,
          x: "0%",
          opacity: 1,
          ease: "expo.out",
        });
      }
    }
  };

  const goToImageIndexVertical = (index, direction = null) => {
    const imageToGo = document.querySelector("#image-" + codeName + index);
    setNewZIndexLevel(newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        tl.to(imageToGo, {
          duration: 0,
          y: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }).to(imageToGo, {
          duration: 1,
          y: "0%",
          opacity: 1,
          ease: "expo.out",
        });
      } else {
        tl.to(imageToGo, {
          duration: 0,
          y: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        }).to(imageToGo, {
          duration: 1,
          y: "0%",
          opacity: 1,
          ease: "expo.out",
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
          className={styles.expandCarouselWrapper + " expandCarouselWrapper"}
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
                <Image src={el} alt={altText} fill sizes="100dvw" />
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
            {images.map((el, index) => (
              <div
                key={index}
                className={
                  styles.singleThumbnailVertical +
                  " " +
                  (index === currentIndex ? styles.currentImg : "")
                }
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

      <div className={styles.thumbnailControls + " thumbnailControls"}>
        <div className={styles.thumbnails}>
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
