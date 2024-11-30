import { animate } from "motion";

export function createSpanStructureV2(w) {
  const charArr = w.split("");
  let returnString = "";
  charArr.forEach((element, index) => {
    returnString += `<span style="--i:${index + 1
      }"><span>${element}</span></span>`;
  });
  return returnString;
}

export function parallax(event, elements) {
  elements.forEach((el, i) => {
    let mf = 0;
    switch (i) {
      case 0:
        mf = 0.5;
        break;
      case 1:
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
      default:
        mf = 0.5;
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

export const hideFrame = () => {
  animate(`#frameContainer`, {
    scale: [1, 1.4],
  }, {
    duration: 0.5
  });
}

export const unhideFrame = (duration = null) => {
  animate(`#frameContainer`, {
    scale: [1.4, 1],
  }, {
    duration: duration ?? 0.5
  });
}