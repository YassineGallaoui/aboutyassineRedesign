import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  text: string;
  updateCompletion: (isComplete: boolean) => void;
  delay?: number;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const TypingText: React.FC<TypingTextProps> = ({ text, updateCompletion, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const currentIndexRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const typeNextCharacter = () => {
      if (currentIndexRef.current < text.length) {
        const nextCharacter = text[currentIndexRef.current];
        const typingSpeed = getRandomInt(50, 150);

        setTimeout(() => {
          if (isMounted) {
            setDisplayText((prevDisplayText) => prevDisplayText + nextCharacter);

            currentIndexRef.current += 1;

            if (currentIndexRef.current === text.length) {
              updateCompletion(true);
            } else {
              typeNextCharacter();
            }
          }
        }, typingSpeed);
      }
    };

    setTimeout(() => {
      typeNextCharacter();
    }, delay);

    return () => {
      isMounted = false;
    };
  }, [text, updateCompletion]);

  return <>{displayText}</>;
};

export default TypingText;
