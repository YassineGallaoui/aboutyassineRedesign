"use client";

import { useEffect, useState } from 'react';

const useScreenInfo = () => {
    const [screenInfo, setScreenInfo] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const isTouchOnly = matchMedia('(hover: none) and (pointer: coarse)').matches;
            const hasMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

            setScreenInfo({
                width: window.innerWidth,
                height: window.innerHeight,
                aspectRatio: window.innerWidth / window.innerHeight,
                isTouchOnly: isTouchOnly,
                hasMouse: hasMouse,
            });
        };
        const handleOrientation = (event) => {
            const tiltRight = event.gamma; // 'gamma' represents the left-right tilt in degrees (-90 to 90)

            // Map the tilt to a suitable x-axis position range
            const maxTilt = 30; // Adjust max tilt range as needed
            const mappedX = Math.min(Math.max(tiltRight, -maxTilt), maxTilt) * 5; // Scale multiplier for effect strength

            setScreenInfo({ xTilt: mappedX });
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation, true);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return screenInfo;
};

export default useScreenInfo;
