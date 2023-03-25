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