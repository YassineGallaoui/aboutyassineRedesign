import gsap from "gsap";

export function createSpanStructureV2(w) {
  const charArr = w.split("");
  let returnString = "";
  charArr.forEach((element, index) => {
    returnString += `<span style="--i:${index + 1
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

export function parallax(event, elements) {
  elements.forEach((el, i) => {
    let mf = 0;
    switch (i) {
      case 0:
        mf = 0;
        break;
      case 1:
        mf = 0.5;
        break;
      case 2:
      default:
        mf = 0.25;
        break;
    }

    const x = (window.innerWidth / 2 - event.pageX) / (window.innerWidth * mf);
    const y = (window.innerHeight / 2 - event.pageY) / (window.innerHeight * -0.1);

    el.style.transform = `translateX(${-x}%) translateY(${y}px)`;
  });
}

export function parallaxMobile(event, elements, screenInfo) {
  elements.forEach((el, i) => {
    let mf = 0;
    switch (i) {
      case 0:
        mf = 0;
        break;
      case 1:
        mf = 0.5;
        break;
      case 2:
      default:
        mf = 0.25;
        break;
    }

    const mobileFactor = (window.innerWidth * ((screenInfo?.xTilt + 1) / 2));

    const x = (window.innerWidth / 2 - mobileFactor) / (window.innerWidth * mf);
    const y = (window.innerHeight / 2 - event.pageY) / (window.innerHeight * -0.1);

    el.style.transform = `translateX(${-x}%) translateY(${y}px)`;
  });
}


export const calculateScrollPercentage = (pageContent) => {
  const scrollTop = pageContent.scrollTop;
  const scrollHeight = pageContent.scrollHeight;
  const clientHeight = pageContent.clientHeight;

  const scrolledDistance = scrollTop;

  const scrollPercentage =
    (scrolledDistance / (scrollHeight - clientHeight)) * 100;

  return scrollPercentage.toFixed(0);
};

export const hideFrame = (themeContainer) => {
  themeContainer.classList.add("quickTransition");
  gsap.to(`.logoWrapper`, {
    x: "-7rem",
    y: "-7rem",
    duration: 0.5
  });
  gsap.to(`.booking`, {
    x: "-7rem",
    duration: 0.5
  });
  gsap.to(`.available`, {
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
  gsap.to(`.logoWrapper`, {
    x: '-3rem',
    y: '-3rem',
    duration: 0.5,
  });
  gsap.to(`.booking`, {
    x: "-2rem",
    duration: 0.5
  });
  gsap.to(`.available`, {
    x: "0rem",
    y: "0rem",
    duration: 0.5
  });
  gsap.to(`.themeContainer`, {
    x: 0,
    y: 0,
    duration: 0.5,
  });
  gsap.to(`.sectionsNav`, {
    x: "0rem",
    duration: 0.5,
  });
  gsap.to(`.contacts`, {
    x: '-1rem',
    y: '1rem',
    duration: 0.5,
  });
  setTimeout(() => {
    themeContainer.classList.remove("quickTransition");
  }, 600);
}