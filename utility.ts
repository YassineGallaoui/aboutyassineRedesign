import { useEffect, useState } from "react";

export function createSpanStructure(w) {
    const charArr = w.split('');
    let returnString = '';
    charArr.forEach((element, index) => {
      returnString += `<span style="--i:${index+1}">${element}</span>`;  
    });
    return returnString;
}


export function scrollHorizontal(event) {
  event.preventDefault();
  if (!event.deltaY) {
    return;
  }
  if (!event.shiftKey) {
    event.preventDefault();
    event.currentTarget.scrollLeft += (event.deltaY + event.deltaX)*10;
  }
}

export function parallax(event) {
  this.querySelectorAll(".sectionBkgrdTxt").forEach((el) => {
      const x = (window.innerWidth - event.pageX * 1) / 90;
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
        if (swipeDirection === "left") {
          console.log("ciao");
        } else {
          console.log("addio");
        }
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