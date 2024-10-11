import { useMemo, useRef, useState } from "react";
import * as THREE from 'three';

interface GenericTriangleProps {
    vertices: THREE.Vector3[];
    position: THREE.Vector3;
    materialType: "color" | "image";
    color?: string;
    imageUrl?: string;
    opacity?: number;
    index: number;
}

export default function GenericTriangle({ vertices, position, materialType, color, opacity, imageUrl, index }: GenericTriangleProps) {
    const meshRef = useRef(null);

    const vert = useMemo(() => {
        const p = new Array(vertices.length)
            .fill(0)
            .flatMap((item, index) => vertices[index].toArray())
        return new THREE.BufferAttribute(new Float32Array(p), 3);
    }, [vertices]);

    /* const texture = useLoader(THREE.TextureLoader, imageUrl ?? ""); */
    const [hovered, setHovered] = useState(false)
    /* const materialProps =
        materialType === "image"
            ? { map: texture }
            : { color: hovered ? "hotpink" : color || "white" }; */
    const materialProps = { color: hovered ? "hotpink" : color ?? "#5243aa",transparent: true, opacity: opacity };

    /* useFrame((state, delta) => (meshRef.current.rotation.z += delta)) */

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
            {/* <planeGeometry args={[1, 1]} /> */}
            <meshBasicMaterial attach="material" {...materialProps}
                wireframe={false}
                side={THREE.DoubleSide} />
        </mesh>
    )
}