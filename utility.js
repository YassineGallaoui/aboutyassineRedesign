export function createSpanStructure(w) {
    const charArr = w.split('');
    let returnString = '';
    charArr.forEach((element, index) => {
      returnString += `<span style="--i:${index+1}">${element}</span>`;  
    });
    return returnString;
}