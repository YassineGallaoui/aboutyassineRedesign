"use client";

import { useEffect, useState } from 'react';

const useScreenInfo = () => {
    const [screenInfo, setScreenInfo] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const isTouchOnly = matchMedia('(hover: none) and (pointer: coarse)').matches;
            const hasMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

            setScreenInfo((prevState) => ({
                ...prevState,
                width: window.innerWidth,
                height: window.innerHeight,
                aspectRatio: window.innerWidth / window.innerHeight,
                isTouchOnly: isTouchOnly,
                hasMouse: hasMouse,
            }));
        };
        const handleOrientation = (event) => {
            const tiltRight = event.gamma;

            const maxTilt = 10;
            const mappedX = (Math.min(Math.max(tiltRight, -maxTilt), maxTilt) / 10);

            setScreenInfo((prevState) => ({ ...prevState, xTiltActive: true, xTilt: mappedX }));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        if (window.DeviceOrientationEvent && matchMedia('(hover: none) and (pointer: coarse)').matches) {
            window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
            setScreenInfo((prevState) => ({ ...prevState, xTiltActive: false }));
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return screenInfo;
};

export default useScreenInfo;
