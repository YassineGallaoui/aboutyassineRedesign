import { useState, useEffect } from 'react';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function ProgressBarCMD ({text, updateCompletion}) {
  const [displayText, setDisplayText] = useState(text);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        const typingSpeed = getRandomInt(50, 200); // Random speed between 100 and 500 ms

        setTimeout(() => {
          setDisplayText(displayText.substring(0, currentIndex)+'≡'+text.substring(currentIndex+2));
          currentIndex !== text.length-3 ? setCurrentIndex(currentIndex + 1) : updateCompletion(true);
        }, typingSpeed);
      }
    };
      typeNextCharacter();
  }, [currentIndex]);

  return <>{displayText}</>;

};
