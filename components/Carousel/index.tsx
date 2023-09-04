import styles from "./Carousel.module.scss";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrRight from "../../public/icons/arr.svg";
import arrExpand from "../../public/icons/expand.svg";
import gsap from 'gsap';
import { Project } from "../../dataset";
import { textAnimationBackward, textAnimationForward, verticalTextAnimationBackward, verticalTextAnimationForward } from "../../utils/utility";

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
  const projectName = content.name;
  const images = content.media;
  const altText = content.name + " for " + content.workingFor;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageNumberSpanTags, setImageNumberSpanTags] = useState<NodeListOf<Element>>();
  const [verticalImageNumberSpanTags, setVerticalImageNumberSpanTags] = useState<NodeListOf<Element>>();

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
    let imagesNumber = document.querySelectorAll(".indexWrapper > span > span");
    setImageNumberSpanTags(imagesNumber);

    let verticalImagesNumber = document.querySelectorAll(".verticalIndexWrapper > span > span");
    setVerticalImageNumberSpanTags(verticalImagesNumber);
  }, []);

  const prevBtnMouseOver = () => {
    tl.to(prevBtnRef.current, { duration: 0.2, x: -20 })
      .to(prevBtnRef.current, { duration: 0, x: 20, y: 0 })
      .to(prevBtnRef.current, { x: 0 });
    tl2.to(prevBtnVerticalRef.current, { duration: 0.2, y: -20 })
      .to(prevBtnVerticalRef.current, { duration: 0, y: 20, x: 0 })
      .to(prevBtnVerticalRef.current, { y: 0 });
    cursorIsHover(true);
  };

  const nextBtnMouseOver = () => {
    tl.to(nextBtnRef.current, { duration: 0.2, x: 20 })
      .to(nextBtnRef.current, { duration: 0, x: -20, y: 0 })
      .to(nextBtnRef.current, { x: 0 });
    tl2.to(nextBtnVerticalRef.current, { duration: 0.2, y: 20 })
      .to(nextBtnVerticalRef.current, { duration: 0, y: -20, x: 0 })
      .to(nextBtnVerticalRef.current, { y: 0 });
    cursorIsHover(true);
  };

  const expandBtnMouseOver = () => {
    tl.to(expandBtnRef.current, { duration: 0.3, scale: 1.4 });
    cursorIsHover(true);
  };

  const expandBtnMouseLeave = () => {
    tl.to(expandBtnRef.current, { duration: 0.3, scale: 1 });
    cursorIsHover(false);
  };

  const expandBtnClick = () => {
    setExpandedCarousel(!expandedCarousel);
    if (expandedCarousel) {
      // compressing the carousel //

      tl.to(".expandCarouselWrapper", {
        duration: 0.6,
        right: "0rem",
      })
      .to(
        ".thumbnailControlsVertical",
        {
          duration: 0.6,
          x: 100,
          opacity: 0,
          flex: "0 0 0",
        },
        0
      )
      .to(
        ".imageStackContainer",
        {
          duration: 0.6,
          flex: "1 0 100%",
        },
        0
      )
      .to(
          ".imageContainer",
          {
            duration: 0.4,
            height: "90%",
            gap: "0rem",
          },
          0
        )
        .to(
          ".indexWrapper",
          {
            duration: 0.4,
            x: 0,
            opacity: 1,
          },
          0
        )
        .to(
          ".thumbnailControls",
          {
            duration: 0.4,
            y: 0,
            opacity: 1,
            height: '10%',
          },
          0
        )

    } else {
      // expanding the carousel //

      tl.to(".expandCarouselWrapper", {
        duration: 0.4,
        right: "3rem",
      })
      .to(
        ".thumbnailControls",
        {
          duration: 0.4,
          y: 100,
          opacity: 0,
          height: 0,
        },
        0
      )
      .to(
        ".indexWrapper",
        {
          duration: 0.4,
          x: -40,
          opacity: 0,
        },
        0
      )
      .to(
          ".imageContainer",
          {
            duration: 0.4,
            height: "100%",
            gap: "1rem",
          },
          0
        )
      .to(
        ".imageStackContainer",
        {
          duration: 0.6,
          flex: "1 0 calc(90% - 1rem)",
        },
        0
      )
      .to(
        ".thumbnailControlsVertical",
        {
          duration: 0.6,
          opacity: 1,
          x: 0,
          flex: "1 0 10%",
        },
        0
      )
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
      if(vertical) 
        goToImageIndexVertical(
          currentIndex === 0 ? images.length - 1 : currentIndex - 1,
          "left"
        );
      else 
        goToImageIndex(
          currentIndex === 0 ? images.length - 1 : currentIndex - 1,
          "left"
        );
    }, 200);

    if(vertical)
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
      if(vertical) 
        goToImageIndexVertical(
          currentIndex === images.length - 1 ? 0 : currentIndex + 1,
          "right"
        );
      else 
        goToImageIndex(
          currentIndex === images.length - 1 ? 0 : currentIndex + 1,
          "right"
        );
    }, 200);
    if(vertical)
      tl3.to(nextBtnVerticalRef.current, { duration: 0.2, y: 3 })
        .to(nextBtnVerticalRef.current, { y: 0 });
    else
      tl3.to(nextBtnRef.current, { duration: 0.2, x: 3 })
        .to(nextBtnRef.current, { x: 0 });
  };

  const thumbnailClickHandle = (imageIndex: number, vertical=null) => {
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
        if(vertical)
          goToImageIndexVertical(imageIndex);
        else
          goToImageIndex(imageIndex);
      }, 200);
    }
  };

  const goToImageIndex = (index, direction = null) => {
    const imageToGo = document.querySelector("#image-"+projectName+index);
    setNewZIndexLevel(newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        tl
        .to(imageToGo, {
          duration: 0,
          x: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        })
        .to(imageToGo, {
          duration: 1,
          x: "0%",
          opacity: 1,
          ease: "expo.out"
        })
      } else {
        tl
        .to(imageToGo, {
          duration: 0,
          x: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        })
        .to(imageToGo, {
          duration: 1,
          x: "0%",
          opacity: 1,
          ease: "expo.out"
        })
      }
    }
  };

  const goToImageIndexVertical = (index, direction = null) => {
    const imageToGo = document.querySelector("#image-"+projectName+index);
    setNewZIndexLevel(newZIndexLevel + 1);
    if (index != currentIndex) {
      setCurrentIndex(index);
      if (
        direction === "right" ||
        (direction == null &&
          (index > currentIndex ||
            (currentIndex === images.length - 1 && index === 0)))
      ) {
        tl
        .to(imageToGo, {
          duration: 0,
          y: "100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        })
        .to(imageToGo, {
          duration: 1,
          y: "0%",
          opacity: 1,
          ease: "expo.out"
        })
      } else {
        tl
        .to(imageToGo, {
          duration: 0,
          y: "-100%",
          zIndex: newZIndexLevel,
          opacity: 1,
        })
        .to(imageToGo, {
          duration: 1,
          y: "0%",
          opacity: 1,
          ease: "expo.out"
        })
      }
    }
  };

  return (
    <div className={styles.component + " carouselComponent"}>
      <div className={styles.upperControls + " upperControls"}>
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
      </div>

      <div className={styles.imageContainer + " imageContainer"}>
        <div
          className={styles.imageStackContainer+ " imageStackContainer"}
        >
          {images.map((el,index)=>{
            return (
              <div id={'image-'+projectName+index} className={styles.imageDiv} key={index} style={{zIndex: 5-index}}>
                <Image
                  src={el}
                  alt={altText}
                  fill
                />
              </div>
            )
          })
          }
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
                <Image src={el} alt={altText} fill></Image>
              </div>
            ))}
          </div>
          {/* numero slide e frecce */}
          <div className={styles.verticalNumberAndArrows}>
            <div className={styles.verticalIndexWrapper + " verticalIndexWrapper"}>
              <span>
                <span>{"0"}</span>
              </span>
              <span>
                <span>{currentIndex + 1}</span>
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