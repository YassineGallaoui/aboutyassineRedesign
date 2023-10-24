export enum breakpoints {
  mobileSmall,
  mobile,
  tablet,
  desktop,
  desktopLarge,
}
export function getDeviceType() {
  const width = window.innerWidth;

  if (width <= 456) {
    return breakpoints.mobileSmall;
  } else if (width > 456 && width <= 567) {
    return breakpoints.mobile;
  } else if (width > 567 && width <= 768) {
    return breakpoints.tablet;
  } else if (width > 768 && width <= 992) {
    return breakpoints.desktop;
  } else {
    return breakpoints.desktopLarge;
  }
}

export function rootFontSize(deviceType) {
  let fontSize;
  switch (deviceType) {
    case breakpoints.mobileSmall:
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
      break;
    case breakpoints.desktopLarge:
    default:
      fontSize = 16;
      break;
  }
  return fontSize;
}
