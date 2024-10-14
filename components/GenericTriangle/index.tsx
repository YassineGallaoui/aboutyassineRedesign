import { StaticImageData } from "next/image";
import { useMemo, useRef, useState } from "react";
import * as THREE from 'three';

interface GenericTriangleProps {
    vertices: THREE.Vector3[];
    position: THREE.Vector3;
    materialType: "color" | "image";
    color?: string;
    imageUrl: StaticImageData | null;
    opacity?: number;
    indexX: number;
    indexY: number;
    totX: number;
}

export default function GenericTriangle({ vertices, position, materialType, color, opacity, imageUrl, indexX, indexY, totX }: GenericTriangleProps) {
    const meshRef = useRef(null);
    const [hovered, setHovered] = useState(false)
    
    const vert = useMemo(() => {
        const p = new Array(vertices.length)
            .fill(0)
            .flatMap((item, index) => vertices[index].toArray())
        return new THREE.BufferAttribute(new Float32Array(p), 3);
    }, [vertices]);
    console.log(imageUrl?.src);
    /* const texture = useLoader(THREE.TextureLoader, imageUrl?.src || ''); */

    // Determine the material props based on the materialType
    /* const materialProps = materialType === 'image' && imageUrl?.src
        ? { map: texture }
        : { color: color || 'white' }; */
    
    /* const materialProps =
        materialType === "image"
            ? { map: texture }
            : { color: hovered ? "hotpink" : color || "white" }; */
    const materialProps = { color: color ?? 'rgb(0,0,0)',transparent: true, opacity: hovered ? 1 : opacity };

    /* useFrame((state, delta) => (meshRef.current.rotation.y += delta)) */
    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    {...vert}
                />
            </bufferGeometry>
            <meshBasicMaterial attach="material" {...materialProps}
                wireframe={false}
                side={THREE.DoubleSide} />
            {/* Render the text inside the triangle */}
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
        </mesh>
    )
}