import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export const LightPointer = () => {
    const lightRef = useRef<THREE.PointLight>(null);
    const targetRef = useRef(new THREE.Object3D());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const zPos = 3;

    // Update mouse position
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = ((event.clientX / window.innerWidth) * 2 - 1) * 6;
            const y = (-(event.clientY / window.innerHeight) * 2 + 1) * 6;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
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
                decay={2.5} 
                intensity={Math.PI * 10}
            />
            {/* {lightRef.current && (
                <pointLightHelper args={[lightRef.current, 1, "red"]} />
            )} */}
        </>
    );
};