export enum breakpoints {
  smallMobile,
  mobile,
  tablet,
  desktop,
}
export function getDeviceType() {
  const width = window.innerWidth;

  if (width < 456) {
    return breakpoints.smallMobile;
  } else if (width >= 456 && width < 567) {
    return breakpoints.mobile;
  } else if (width >= 567 && width <= 768) {
    return breakpoints.tablet;
  } else {
    return breakpoints.desktop;
  }
}

export function rootFontSize(deviceType) {
  let fontSize;
  switch (deviceType) {
    case breakpoints.smallMobile:
      fontSize = 5;
      break;
    case breakpoints.mobile:
      fontSize = 7;
      break;
    case breakpoints.tablet:
      fontSize = 8;
      break;
    case breakpoints.desktop:
      fontSize = 12;
    default:
      break;
  }
  return fontSize;
}
