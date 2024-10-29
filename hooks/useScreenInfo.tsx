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
        
        handleResize();

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenInfo;
};

export default useScreenInfo;
