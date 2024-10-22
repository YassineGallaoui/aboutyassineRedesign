import { useFrame, useLoader } from "@react-three/fiber";
import { StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { Project } from '../../utils/dataset';

interface ProjectTriangleProps {
    projectData: Project;
    vertices: THREE.Vector3[];
    position: THREE.Vector3;
    imageUrl?: StaticImageData | null;
    color?: string;
    upsideDown: boolean;
    triangleMouseOver: Function,
    triangleMouseOut: Function,
    triangleMouseClick: Function,
    scale?: number,
}

export default function ProjectTriangle({
    projectData,
    vertices,
    position,
    imageUrl,
    color,
    upsideDown,
    triangleMouseOver, 
    triangleMouseOut,
    triangleMouseClick,
    scale=1,
}: ProjectTriangleProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(()=>{
        if (hovered)
            triangleMouseOver(projectData.id)
        else 
            triangleMouseOut(projectData.id)
    }, [hovered])
    
    const texture = useLoader(THREE.TextureLoader, imageUrl?.src || '');
    
    const vert = useMemo(() => {
        const p = vertices.flatMap((vertex) => vertex.toArray());
        return new THREE.BufferAttribute(new Float32Array(p), 3);
    }, [vertices]);
    
    const uvs = useMemo(() => {
        const ratio = texture.image.width / texture.image.height;
        let uvCoords;

        if (upsideDown) {
            uvCoords = [
                0.5, 0,
                1, 1,
                0, 1
            ];
        } else {
            uvCoords = [
                0.5, 1,
                1, 0,
                0, 0
            ];
        }

        return new THREE.BufferAttribute(new Float32Array(uvCoords), 2);
    }, [upsideDown, texture]);
    
    const materialProps = imageUrl
        ? {
            map: texture,
            color: "white"
        }
        : {
            transparent: true,
            color: color || 'gray',
        };
    
    useFrame(() => {
        if (meshRef.current) {
            const targetZ = hovered ? position.z * 0.95 : position.z;
            const speed = 0.4;
            meshRef.current.position.z += (targetZ - meshRef.current.position.z) * speed;
        }
    });


    return (
        <mesh
            castShadow
            receiveShadow
            ref={meshRef}
            position={position}
            scale={[scale, scale, 1]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={() => triangleMouseClick(projectData.id)}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    {...vert}
                />
                {imageUrl && (
                    <bufferAttribute
                        attach="attributes-uv"
                        {...uvs}
                    />
                )}
            </bufferGeometry>
            <meshStandardMaterial
                attach="material"
                {...materialProps}
                wireframe={false}/* 
                roughness={0.7}
                metalness={0.2} */
                side={THREE.DoubleSide}
                flatShading={true}
            />
        </mesh>
    );
}
