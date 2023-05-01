import { useEffect, useState } from "react";
import gsap from "gsap";

export function createSpanStructure(w) {
    const charArr = w.split('');
    let returnString = '';
    charArr.forEach((element, index) => {
      returnString += `<span style="--i:${index + 1}"><span>${element}</span></span>`;  
    });
    return returnString;
}

export function textAnimationForward(el, index) {
  const tl = gsap.timeline({});
  tl.to(el, { delay: 0.05 * index, duration: 0.25, x: 10 })
    .to(el, { duration: 0, x: -10 })
    .to(el, { duration: 0.25, x: 0 });
}

export function textAnimationBackward(el, index) {
  const tl = gsap.timeline({});
  tl.to(el, { delay: 0.05 * index, duration: 0.25, x: -10 })
    .to(el, { duration: 0, x: 10 })
    .to(el, { duration: 0.25, x: 0 });
}


/* export function scrollHorizontal(event) {
  event.preventDefault();
  if (!event.deltaY) {
    return;
  }
  if (!event.shiftKey) {
    event.preventDefault();
    event.currentTarget.scrollLeft += (event.deltaY + event.deltaX)*10;
  }
} */

export function parallax(event, element) {
  element.forEach((el) => {
    const x = (window.innerWidth - event.pageX * 2) / 90;
    const y = (window.innerHeight - event.pageY * 2) / 90;

    el.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}
export const useSwipe = () => {
  const [position, setPosition] = useState(0);

  let startX = 0;
  let startY = 0;
  let dist = 0;
  let threshold = 50;
  let allowedTime = 300;
  let elapsedTime = 0;
  let startTime = 0;

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    startTime = new Date().getTime();
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    let deltaX = touch.pageX - startX;
    let deltaY = touch.pageY - startY;
    dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const handleTouchEnd = (e) => {
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime && dist >= threshold) {
      if (Math.abs(startX - e.changedTouches[0].pageX) >= threshold) {
        const swipeDirection = startX > e.changedTouches[0].pageX ? "left" : "right";
        setPosition((prevPosition) =>
          startX > e.changedTouches[0].pageX
            ? prevPosition + 100
            : prevPosition - 100
        );
      }
    }
  };

  useEffect(() => {
    // add event listeners to the document for touch events
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // remove event listeners on cleanup
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { handleTouchStart, handleTouchMove, handleTouchEnd, position };
}