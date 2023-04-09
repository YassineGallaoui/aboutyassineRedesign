import styles from "./ThreeCarousel.module.scss";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrRight from "../../public/icons/arr.svg";
import gsap from "gsap";

interface CarouselProps {
  images: StaticImageData[];
  w: number;
  h: number;
}

function Carousel({ images, w, h }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevImgSrc, setPrevImgSrc] = useState<StaticImageData>(
    images[images.length - 1]
  );
  const [currentImgSrc, setCurrentImgSrc] = useState<StaticImageData>(
    images[0]
  );
  const [nextImgSrc, setNextImgSrc] = useState<StaticImageData>(images[1]);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevImageRef = useRef(null);
  const mainImageRef = useRef(null);
  const nextImageRef = useRef(null);
  const tl = gsap.timeline({});
  const tl2 = gsap.timeline({});
  const tl3 = gsap.timeline({}); //only for controller

  const prevBtnMouseOver = () => {
    tl.to(prevBtnRef.current, { duration: 0.2, x: -20 })
      .to(prevBtnRef.current, { duration: 0, x: 20, y: 0 })
      .to(prevBtnRef.current, { x: 0 });
  };

  const nextBtnMouseOver = () => {
    tl.to(nextBtnRef.current, { duration: 0.2, x: 20 })
      .to(nextBtnRef.current, { duration: 0, x: -20, y: 0 })
      .to(nextBtnRef.current, { x: 0 });
  };

  const prevBtnClick = () => {
    goToImageIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1, 'left');
    tl3.to(prevBtnRef.current, { duration: 0.2, x: -3 }).to(prevBtnRef.current, {
      x: 0,
    });
  };

  const nextBtnClick = () => {
    goToImageIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
      "right"
    );
    tl3.to(nextBtnRef.current, { duration: 0.2, x: 3 }).to(nextBtnRef.current, {
      x: 0,
    });
  };

  const goToImageIndex = (index, direction=null) => {
    if(index != currentIndex) {
        setPrevImgSrc(images[index]);
        setNextImgSrc(images[index]);
        if (
          direction==='right' || (direction === null && (index > currentIndex ||
          (currentIndex === images.length - 1 && index === 0)))
        ) {
          tl.from(mainImageRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          })
            .to(mainImageRef.current, {
              duration: 1,
              ease: "Expo.easeOut",
              clipPath: "polygon(0% 0%, -5% 0%, -5% 100%, 0% 100%)",
            })
            .to(mainImageRef.current, {
              duration: 0,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            });
          tl2
            .from(nextImageRef.current, {
              left: "0%",
            })
            .to(nextImageRef.current, {
              duration: 1,
              ease: "Expo.easeInOut",
              left: "-100%",
            })
            .to(nextImageRef.current, {
              duration: 0,
              left: "0%",
            });
          setTimeout(() => {
            setPrevImgSrc(images[currentIndex]);
            setCurrentImgSrc(images[index]);
            setNextImgSrc(images[index]);
            setCurrentIndex(index);
          }, 1000);
        } else {
          setPrevImgSrc(images[index]);
          setNextImgSrc(images[index]);

          tl.from(mainImageRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          })
            .to(mainImageRef.current, {
              duration: 1,
              ease: "Expo.easeOut",
              clipPath: "polygon(105% 0, 100% 0, 100% 100%, 105% 100%)",
            })
            .to(mainImageRef.current, {
              duration: 0,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            });
          tl2
            .from(prevImageRef.current, {
              left: "0%",
            })
            .to(prevImageRef.current, {
              duration: 1,
              ease: "Expo.easeInOut",
              left: "100%",
            })
            .to(prevImageRef.current, {
              duration: 0,
              left: "0%",
            });

          setTimeout(() => {
            setPrevImgSrc(images[index]);
            setCurrentImgSrc(images[index]);
            setNextImgSrc(images[currentIndex]);
            setCurrentIndex(index);
          }, 1000);
        }
    }
  };

  return (
    <div className={styles.component}>
      <div className={styles.currentImageContainer}>
        <div className={styles.prevImg}>
          <Image ref={prevImageRef} src={prevImgSrc} alt={""} fill></Image>
        </div>
        <div className={styles.currentImg} ref={mainImageRef}>
          <Image src={currentImgSrc} alt={""} fill></Image>
        </div>
        <div className={styles.nextImg}>
          <Image ref={nextImageRef} src={nextImgSrc} alt={""} fill></Image>
        </div>
      </div>
      <div className={styles.thumbnailControls}>
        <div className={styles.thumbnails}>
          {images.map((el, index) => (
            <div
              key={index}
              className={
                styles.singleThumbnail +
                " " +
                (index === currentIndex ? styles.currentImg : "")
              }
              onClick={() => goToImageIndex(index)}
            >
              <Image src={el} alt={""} fill></Image>
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <div
            className={styles.prevButton}
            onMouseOver={() => prevBtnMouseOver()}
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
