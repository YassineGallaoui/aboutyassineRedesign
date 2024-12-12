import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export const LightPointer = ({ decay = null, intensity = null }) => {
    const lightRef = useRef<THREE.PointLight>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const zPos = 3;

    // Update mouse position
    useEffect(() => {
        const updatePosition = () => {
            const x = ((window.mouseX || 0) / window.innerWidth * 2 - 1) * 6;
            const y = (-(window.mouseY || 0) / window.innerHeight * 2 + 1) * 6;
            setMousePosition({ x, y });
            requestAnimationFrame(updatePosition);
        };

        window.addEventListener('mousemove', (e) => {
            window.mouseX = e.clientX;
            window.mouseY = e.clientY;
        });

        const animFrame = requestAnimationFrame(updatePosition);
        return () => cancelAnimationFrame(animFrame);
    }, []);

    useFrame(() => {
        if (lightRef.current) {
            lightRef.current.position.set(-mousePosition.x, mousePosition.y, zPos);
        }
    });

    return (
        <>
            <pointLight ref={lightRef}
                position={[0, 0, zPos]}
                decay={decay ?? 2.5}
                intensity={intensity ?? Math.PI * 10}
            />
            {/* {lightRef.current && (
                <pointLightHelper args={[lightRef.current, 1, "red"]} />
            )} */}
        </>
    );
};