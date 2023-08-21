import styles from "./Carousel.module.scss";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrRight from "../../public/icons/arr.svg";
import arrExpand from "../../public/icons/expand.svg";
import gsap from 'gsap';
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
  const projectName = content.name;
  const images = content.media;
  const altText = content.name + " for " + content.workingFor;
  const [imageStackContainer, setImageStackContainer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [spanTags, setSpanTags] = useState<NodeListOf<Element>>();

  const [newZIndexLevel, setNewZIndexLevel] = useState(5);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const expandBtnRef = useRef(null);
  const expandBtnVerticalRef = useRef(null);
  const tl = gsap.timeline({});
  const tl2 = gsap.timeline({});
  const tl3 = gsap.timeline({});

  useEffect(() => {
    let imagesNumber = document.querySelectorAll(".indexWrapper > span > span");
    setSpanTags(imagesNumber);
    setImageStackContainer(document.querySelector('.imageStackContainer'));
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
    tl.to(expandBtnRef.current, { duration: 0.3, scale: 1.4 });
    cursorIsHover(true);
  };

  const expandBtnMouseLeave = () => {
    tl.to(expandBtnRef.current, { duration: 0.3, scale: 1 });
    cursorIsHover(false);
  };

  const expandBtnVerticalMouseOver = () => {
    tl.to(expandBtnVerticalRef.current, { duration: 0.3, scale: 1 });
    cursorIsHover(true);
  }

  const expandBtnVerticalMouseLeave = () => {
    tl.to(expandBtnVerticalRef.current, { duration: 0.3, scale: 1.4 });
    cursorIsHover(false);
  }

  const expandBtnClick = () => {
    setExpandedCarousel(!expandedCarousel);
    if (expandedCarousel) {

      // IF //

      tl.to(".expandCarouselWrapper", {
        duration: 0.6,
        right: "1rem",
      })
        .to(
          ".thumbnailControlsVertical",
          {
            duration: 0.4,
            opacity: 0,
            flex: "0 1 0%",
          },
          0
        )
        .to(
          ".thumbnailControlsVertical",
          {
            duration: 0,
            height: "0%",
          },
          0.4
        )
        .to(
          ".carouselComponent",
          {
            duration: 0.4,
            gap: "1rem",
          },
          0
        )
        .to(
          ".carouselComponent",
          {
            duration: 0,
            justifyContent: "space-between",
            gap: "1rem",
          },
          0.4
        )
        .to(
          ".prevImg, .currentImg, .nextImg",
          {
            duration: 0.4,
            aspectRatio: "4 / 3",
          },
          0
        )
        .to(
          ".thumbnailControls",
          {
            duration: 0,
            display: "flex",
          },
          0
        )
        .to(
          ".thumbnailControls",
          {
            duration: 0.4,
            y: 0,
            opacity: 1,
            height: "8%",
          },
          0
        )
        .to(
          ".upperControls",
          {
            duration: 0,
            display: "flex",
          },
          0
        )
        .to(
          ".upperControls",
          {
            duration: 0.4,
            y: 0,
            opacity: 1,
            height: "auto",
          },
          0
        )
        .to(
          ".imageContainer",
          {
            duration: 0.4,
            height: "92%",
            gap: "0rem",
          },
          0
        );



    } else {
      // ELSE //

      tl.to(".expandCarouselWrapperVertical", {
        duration: 0.4,
        right: "3rem",
      })
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
          ".thumbnailControls",
          {
            duration: 0,
            display: "none",
          },
          0.4
        )
        .to(
          ".upperControls",
          {
            duration: 0.2,
            y: -100,
            opacity: 0,
            height: 0,
          },
          0
        )
        .to(
          ".upperControls",
          {
            duration: 0,
            display: "none",
          },
          0.4
        )
        .to(
          ".carouselComponent",
          {
            duration: 0.6,
            gap: "0rem",
          },
          0
        )
        .to(
          ".carouselComponent",
          {
            duration: 0,
            justifyContent: "center",
          },
          0.6
        )
        .to(
          ".prevImg, .currentImg, .nextImg",
          {
            duration: 0.4,
            aspectRatio: "16 / 9",
          },
          0.2
        )
        .to(
          ".thumbnailControlsVertical",
          {
            duration: 0,
            height: "100%",
            opacity: 0.4,
          },
          0
        )
        .to(
          ".thumbnailControlsVertical",
          {
            duration: 0.6,
            opacity: 1,
            flex: "1 0 10%",
          },
          0
        );
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
      .to(prevBtnRef.current, { x: 0 });
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

    tl3.to(nextBtnRef.current, { duration: 0.2, x: 3 })
    .to(nextBtnRef.current, { x: 0 });
  };

  const thumbnailClickHandle = (imageIndex: number) => {
    if (imageIndex != currentIndex) {
      spanTags.forEach((el, index) => {
        imageIndex > currentIndex
          ? textAnimationBackward(el, index + 1)
          : textAnimationForward(el, index + 1);
      });
      setTimeout(() => {
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
          <div className={styles.verticalUpperControl}>
            <div className={styles.indexWrapper + " indexWrapper"}>
              <span>
                <span>{"0"}</span>
              </span>
              <span>
                <span>{currentIndex + 1}</span>
              </span>
            </div>

            <div
              className={
                styles.expandCarouselWrapperVertical + " expandCarouselWrapperVertical"
              }
              onMouseOver={() => expandBtnVerticalMouseOver()}
              onMouseLeave={() => expandBtnVerticalMouseLeave()}
              onClick={() => expandBtnClick()}
            >
              <Image
                id="arrExpand"
                ref={expandBtnVerticalRef}
                className={styles.arrExpand}
                src={arrExpand}
                alt={"expand"}
              ></Image>
            </div>
          </div>
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
