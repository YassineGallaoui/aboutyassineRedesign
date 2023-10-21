/* import { useState, useEffect } from "react";

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function ProgressBarCMD({ text, updateCompletion }) {
  const [displayText, setDisplayText] = useState(text);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        const typingSpeed = getRandomInt(5, 100); // Random speed between 5 and 100 ms

        setTimeout(() => {
          setDisplayText(
            displayText.substring(0, currentIndex) +
              "≡" +
              text.substring(currentIndex + 2),
          );
          currentIndex !== text.length - 3
            ? setCurrentIndex(currentIndex + 1)
            : updateCompletion(true);
        }, typingSpeed);
      }
    };
    typeNextCharacter();
  }, [currentIndex]);

  return <>{displayText}</>;
}
 */

import { useEffect, useState } from "react";

export default function ProgressBarCMD({ text, updateCompletion }) {
  const [progressText, setProgressText] = useState(text);
  const totalDuration = 2000; // 5 seconds
  const stepDuration = 100; // Speed of each step
  const totalSteps = totalDuration / stepDuration;

  useEffect(() => {
    let currentStep = 0;
    let interval;

    const updateProgress = () => {
      currentStep++;
      const equals = Math.floor((currentStep / totalSteps) * text.length);
      const newProgressText = `[${"=".repeat(equals)}${"·".repeat(
        text.length - equals
      )}]`;
      setProgressText(newProgressText);
      if (currentStep === totalSteps) updateCompletion(true);
      if (currentStep >= totalSteps) {
        clearInterval(interval);
      }
    };

    // Start the animation
    interval = setInterval(updateProgress, stepDuration);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return (
    <div>
      <pre>{progressText}</pre>
    </div>
  );
};