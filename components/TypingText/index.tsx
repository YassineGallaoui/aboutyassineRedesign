import { useState, useEffect } from "react";

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function TypingText({ text, updateCompletion }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        const nextCharacter = text[currentIndex];
        const typingSpeed = getRandomInt(50, 150); // Random speed between 100 and 500 ms
        console.log('typingSpeed', typingSpeed);
        setTimeout(() => {
          setDisplayText(displayText + nextCharacter);
          currentIndex !== text.length - 1
            ? setCurrentIndex(currentIndex + 1)
            : updateCompletion(true);
        }, typingSpeed);
      }
    };
    /* if(currentIndex===0)
      setTimeout(() => {
        typeNextCharacter();
      }, getRandomInt(400, 900));
    else */
    typeNextCharacter();
  }, [currentIndex]);

  return <>{displayText}</>;
}
