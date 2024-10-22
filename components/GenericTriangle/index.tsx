import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from 'three';

interface GenericTriangleProps {
    vertices: THREE.Vector3[];
    position: THREE.Vector3;
    materialType: "color";
    color?: string;
    opacity?: number;
    indexX: number;
    indexY: number;
    totX: number;
    scale?: number
}

export default function GenericTriangle({ vertices, position, materialType, color, opacity, indexX, indexY, totX, scale=1 }: GenericTriangleProps) {
    const meshRef = useRef(null);
    const [hovered, setHovered] = useState(false)

    const vert = useMemo(() => {
        const p = new Array(vertices.length)
            .fill(0)
            .flatMap((item, index) => vertices[index].toArray())
        return new THREE.BufferAttribute(new Float32Array(p), 3);
    }, [vertices]);
    
    // Choose material properties based on materialType
    const materialProps = { color: color ?? 'rgb(0,0,0)', transparent: true, opacity: opacity };

    /* useFrame((state, delta) => (meshRef.current.rotation.y += delta)) */
    useFrame(() => {
        if (meshRef.current) {
            const targetZ = hovered ? position.z * 1.02 : position.z;
            const speed = 0.4;
            meshRef.current.position.z += (targetZ - meshRef.current.position.z) * speed;
        }
    });
    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={[scale, scale, 1]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    {...vert}
                />
            </bufferGeometry>
            <meshStandardMaterial 
                attach="material" 
                {...materialProps}
                wireframe={false}
                side={THREE.DoubleSide} />

        </mesh>
    )
}



/* const texture = useLoader(THREE.TextureLoader, imageUrl?.src || ''); */

// Determine the material props based on the materialType
/* const materialProps = materialType === 'image' && imageUrl?.src
    ? { map: texture }
    : { color: color || 'white' }; */

/* const materialProps =
    materialType === "image"
        ? { map: texture }
        : { color: hovered ? "hotpink" : color || "white" }; */


{/* Render the text inside the triangle */ }
{/* <Text
                position={[0, 0, -0.1]}
                fontSize={0.3}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {(indexX+1).toString()+', '+(indexY+1).toString()}
            </Text> */}
{/* <Text position={[0, -0.4, -0.1]} fontSize={0.3} color="black"
                anchorX="center"
                anchorY="middle">{totX}</Text> */}