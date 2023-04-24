import styles from "./Carousel.module.scss";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrRight from "../../public/icons/arr.svg";
import arrExpand from "../../public/icons/expand.svg";
import gsap from "gsap";
import { Project } from "../../dataset";
import { textAnimationBackward, textAnimationForward } from "../../utility";

interface CarouselProps {
  content: Project;
  updateCursorText: Function;
  cursorIsHover: Function;
  expandedCarousel: boolean;
  setExpandedCarousel: Function;
}

function Carousel({
  content,
  updateCursorText,
  cursorIsHover,
  expandedCarousel,
  setExpandedCarousel,
}: CarouselProps) {
  const images = content.media;
  const altText = content.name + " for " + content.workingFor;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevImgSrc, setPrevImgSrc] = useState<StaticImageData>(
    images[images.length - 1]
  );
  const [currentImgSrc, setCurrentImgSrc] = useState<StaticImageData>(
    images[0]
  );
  const [nextImgSrc, setNextImgSrc] = useState<StaticImageData>(images[1]);
  const [spanTags, setSpanTags] = useState<NodeListOf<Element>>();
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const expandBtnRef = useRef(null);
  const prevImageRef = useRef(null);
  const mainImageRef = useRef(null);
  const nextImageRef = useRef(null);
  const tl = gsap.timeline({});
  const tl2 = gsap.timeline({});
  const tl3 = gsap.timeline({}); // only for controller
  const tl4 = gsap.timeline({}); // expand

  useEffect(() => {
    let imagesNumber = document.querySelectorAll(".indexWrapper > span > span");
    setSpanTags(imagesNumber);
  }, []);

  const prevBtnMouseOver = () => {
    tl.to(prevBtnRef.current, { duration: 0.2, x: -20 })
      .to(prevBtnRef.current, { duration: 0, x: 20, y: 0 })
      .to(prevBtnRef.current, { x: 0 });
    cursorIsHover(true);
  };

  const nextBtnMouseOver = () => {
    tl.to(nextBtnRef.current, { duration: 0.2, x: 20 })
      .to(nextBtnRef.current, { duration: 0, x: -20, y: 0 })
      .to(nextBtnRef.current, { x: 0 });
    cursorIsHover(true);
  };

  const expandBtnMouseOver = () => {
    console.log("expandBtnMouseOver");
    tl.to(expandBtnRef.current, { duration: 0.3, scale: 1.4 });
    cursorIsHover(true);
  };

  const expandBtnMouseLeave = () => {
    console.log("expandBtnMouseLeave");
    tl.to(expandBtnRef.current, { duration: 0.3, scale: 1 });
    cursorIsHover(false);
  };

  const expandBtnClick = () => {
    console.log("click on expand button");
    setExpandedCarousel(!expandedCarousel);
    if (expandedCarousel) {
      gsap.to(".expandCarouselWrapper", {
        duration: 0.6,
        right: "1rem",
      });
      gsap.to(".thumbnailControls", {
        delay: 0.4,
        duration: 0.6,
        y: 0,
        opacity: 1,
      });
    } else {
      tl.to(".expandCarouselWrapper", {
        duration: 0.6,
        right: "4rem",
      });
      tl2.to(".thumbnailControls", {
        duration: 0.6,
        y: 100,
        opacity: 0,
        flex: 0,
      });
      tl3
        .to(".carouselComponent", {
          delay: 0.6,
          duration: 0,
          flexDirection: "row",
          alignItems: "flex-start",
        })
        .to(".thumbnailControls", {
          duration: 0,
          width: 0,
          flex: 0,
        })
        .to(".currentImageContainer", {
          duration: 0,
          left: 0,
          flexDirection: "column",
          height: "300%",
          width: "calc(100% - 110px)",
          top: "-100%",
        });
      tl4.fromTo(
        ".thumbnailControlsVertical",
        {
          duration: 0,
          x: 100,
          opacity: 0,
          flex: 0,
          alignSelf: "flex-end",
          marginLeft: "1rem",
        },
        {
          duration: 1,
          x: 0,
          opacity: 1,
          flex: 1,
          height: 'calc(100% - 4rem)',
          width: '160px',
        }
      );
      /* gsap.to(".thumbnailVertical", {
        width: '100%',
        height: '100%',
      }); */
    }
  };

  const prevBtnClick = () => {
    spanTags.forEach((el, index) => {
      textAnimationForward(el, index + 1);
    });

    setTimeout(() => {
      goToImageIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1,
        "left"
      );
    }, 200);

    tl3
      .to(prevBtnRef.current, { duration: 0.2, x: -3 })
      .to(prevBtnRef.current, {
        x: 0,
      });
  };

  const nextBtnClick = () => {
    spanTags.forEach((el, index) => {
      textAnimationBackward(el, index + 1);
    });

    setTimeout(() => {
      goToImageIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1,
        "right"
      );
    }, 200);

    tl3.to(nextBtnRef.current, { duration: 0.2, x: 3 }).to(nextBtnRef.current, {
      x: 0,
    });
  };

  const thumbnailClickHandle = (imageIndex: number) => {
    console.log(imageIndex > currentIndex);
    if (imageIndex != currentIndex) {
      spanTags.forEach((el, index) => {
        imageIndex > currentIndex
          ? textAnimationBackward(el, index + 1)
          : textAnimationForward(el, index + 1);
      });
      goToImageIndex(imageIndex);
    }
  };

  const goToImageIndex = (index, direction = null) => {
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        setNextImgSrc(images[index]);
        tl.to(mainImageRef.current, {
          duration: 0,
          x: 0,
          filter: "grayscale(0)",
          scale: 1,
          opacity: 1,
        })
          .to(mainImageRef.current, {
            duration: 0.5,
            x: -100,
            filter: "grayscale(1)",
            scale: 0.85,
            opacity: 0,
          })
          .to(mainImageRef.current, {
            duration: 0,
            x: 0,
            filter: "grayscale(0)",
            scale: 1,
            opacity: 1,
          });

        tl2
          .to(nextImageRef.current, {
            duration: 0,
            delay: 0.1,
            x: "-90%",
            filter: "grayscale(1)",
            scale: 1.1,
            opacity: 1,
          })
          .to(nextImageRef.current, {
            duration: 0.5,
            x: "-100%",
            filter: "grayscale(0)",
            scale: 1,
            opacity: 1,
          })
          .to(nextImageRef.current, {
            duration: 0,
            filter: "grayscale(1)",
            x: 0,
            opacity: 0,
          });
        setTimeout(() => {
          setPrevImgSrc(images[index]);
          setCurrentImgSrc(images[index]);
          setNextImgSrc(images[index]);
        }, 400);
      } else {
        setPrevImgSrc(images[index]);
        tl.to(mainImageRef.current, {
          duration: 0,
          x: 0,
          filter: "grayscale(0)",
          scale: 1,
          opacity: 1,
        })
          .to(mainImageRef.current, {
            duration: 0.5,
            x: 100,
            filter: "grayscale(1)",
            scale: 0.85,
            opacity: 0,
          })
          .to(mainImageRef.current, {
            duration: 0,
            x: 0,
            filter: "grayscale(0)",
            scale: 1,
            opacity: 1,
          });

        tl2
          .to(prevImageRef.current, {
            duration: 0,
            delay: 0.1,
            x: "90%",
            filter: "grayscale(1)",
            scale: 1.1,
            opacity: 1,
          })
          .to(prevImageRef.current, {
            duration: 0.5,
            x: "100%",
            filter: "grayscale(0)",
            scale: 1,
            opacity: 1,
          })
          .to(prevImageRef.current, {
            duration: 0,
            filter: "grayscale(1)",
            x: 0,
            opacity: 0,
          });
        setTimeout(() => {
          setPrevImgSrc(images[index]);
          setCurrentImgSrc(images[index]);
          setNextImgSrc(images[index]);
        }, 400);
      }
    }
  };

  return (
    <div className={styles.component + " carouselComponent"}>
      <div className={styles.indexWrapper + " indexWrapper"}>
        <span>
          <span>{"0"}</span>
        </span>
        <span>
          <span>{currentIndex + 1}</span>
        </span>
      </div>
      <div
        className={styles.expandCarouselWrapper + " expandCarouselWrapper"}
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
      <div className={styles.currentImageContainer + " currentImageContainer"}>
        <div className={styles.prevImg}>
          <Image ref={prevImageRef} src={prevImgSrc} alt={altText} fill></Image>
        </div>
        <div className={styles.currentImg} ref={mainImageRef}>
          <Image src={currentImgSrc} alt={altText} fill></Image>
        </div>
        <div className={styles.nextImg}>
          <Image ref={nextImageRef} src={nextImgSrc} alt={altText} fill></Image>
        </div>
      </div>
      <div
        className={
          styles.thumbnailControlsVertical + " thumbnailControlsVertical"
        }
      >
        <div className={styles.thumbnailsVertical + " thumbnailVertical"}>
          {images.map((el, index) => (
            <div
              key={index}
              className={
                styles.singleThumbnailVertical +
                " " +
                (index === currentIndex ? styles.currentImg : "")
              }
              onClick={() => thumbnailClickHandle(index)}
            >
              <Image src={el} alt={altText} fill></Image>
            </div>
          ))}
        </div>
        <div className={styles.controlsVertical}>
          <div
            className={styles.prevButtonVertical}
            onMouseOver={() => prevBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => prevBtnClick()}
          >
            <Image
              id="arrLeft"
              ref={prevBtnRef}
              className={styles.arrLeftVertical}
              src={arrRight}
              alt={"previous"}
            ></Image>
          </div>
          <div
            className={styles.nextButtonVertical}
            onMouseOver={() => nextBtnMouseOver()}
            onMouseLeave={() => cursorIsHover(false)}
            onClick={() => nextBtnClick()}
          >
            <Image
              id="arrRight"
              ref={nextBtnRef}
              className={styles.arrRightVertical}
              src={arrRight}
              alt={"previous"}
            ></Image>
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
              <Image src={el} alt={altText} fill></Image>
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
