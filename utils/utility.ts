import gsap from "gsap";

export function createSpanStructure(w) {
  const charArr = w.split("");
  let returnString = "";
  charArr.forEach((element, index) => {
    returnString += `<span style="--i:${
      index + 1
    }"><span>${element}</span></span>`;
  });
  return returnString;
}

export function textAnimationForward(el, index) {
  const tl = gsap.timeline({});
  tl.to(el, { delay: 0.05 * index, duration: 0.25, x: "0.8rem" })
    .to(el, { duration: 0, x: "-0.8rem" })
    .to(el, { duration: 0.25, x: 0 });
}

export function textAnimationBackward(el, index) {
  const tl = gsap.timeline({});
  tl.to(el, { delay: 0.05 * index, duration: 0.25, x: "-0.8rem" })
    .to(el, { duration: 0, x: "0.8rem" })
    .to(el, { duration: 0.25, x: 0 });
}

export function verticalTextAnimationForward(el, index) {
  const tl = gsap.timeline({});
  tl.to(el, { delay: 0.05 * index, duration: 0.25, y: "1.5rem" })
    .to(el, { duration: 0, y: "-1.5rem" })
    .to(el, { duration: 0.25, y: -3 });
}

export function verticalTextAnimationBackward(el, index) {
  const tl = gsap.timeline({});
  tl.to(el, { delay: 0.05 * index, duration: 0.25, y: "-1.5rem" })
    .to(el, { duration: 0, y: "1.5rem" })
    .to(el, { duration: 0.25, y: -3 });
}

export enum distanceLevels {
  First = 400,
  Second = 800,
  Third = 1200,
}

export function parallax(event, element, distance) {
  element.forEach((el) => {
    const x = (window.innerWidth - event.pageX * 2) / distance;
    const y = (window.innerHeight - event.pageY * 2) / distance;
    /*const xDeg = (window.innerHeight - event.pageY * 2) / (window.innerHeight * 0.05);
    const yDeg = (window.innerWidth - event.pageY * 2) / (window.innerWidth * 0.05);*/

    el.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

export const calculateScrollPercentage = (pageContent) => {
  const scrollTop = pageContent.scrollTop;
  const scrollHeight = pageContent.scrollHeight;
  const clientHeight = pageContent.clientHeight;

  // Calculate the scrolled distance from the top of the content
  const scrolledDistance = scrollTop;

  // Calculate the percentage of scrolled distance
  const scrollPercentage =
    (scrolledDistance / (scrollHeight - clientHeight)) * 100;

  // Return the calculated percentage
  return scrollPercentage.toFixed(0);
};

export const hideFrame = (themeContainer) => {
  themeContainer.classList.add("quickTransition");
  gsap.to(`.logoWrapper`, {
    x: "-4rem",
    y: "-4rem",
    duration: 0.5
  });
  gsap.to(`.lastUpdateText`, {
    x: "-4rem",
    y: "4rem",
    duration: 0.5
  });
  gsap.to(`.themeContainer`, {
    x: "4rem",
    y: "-4rem",
    duration: 0.5,
  });
  gsap.to(`.sectionsNav`, {
    x: "5rem",
    y: 0,
    duration: 0.3,
  });
  gsap.to(`.contacts`, {
    x: "4rem",
    y: "4rem",
    duration: 0.5,
  });
}

export const unhideFrame = (themeContainer) => {
  gsap.to(`.logoWrapper, .lastUpdateText, .themeContainer, .contacts`, {
    x: 0,
    y: 0,
    duration: 0.5,
  });
  gsap.to(`.sectionsNav`, {
    x: "2rem",
    y: 0,
    duration: 0.7,
  });
  setTimeout(() => {
    themeContainer.classList.remove("quickTransition");
  }, 600);
}