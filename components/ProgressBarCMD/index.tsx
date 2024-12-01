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
    <span>
      <span>{progressText}</span>
    </span>
  );
};