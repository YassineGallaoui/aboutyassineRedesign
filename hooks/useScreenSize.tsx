"use client";

import { useEffect, useState } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
                aspectRatio: window.innerWidth / window.innerHeight,
            });
        };
        
        handleResize();

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenSize;
};

export default useScreenSize;
