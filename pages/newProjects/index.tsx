import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as THREE from 'three';
import GenericTriangle from "../../components/GenericTriangle";
import stylesHome from "../../styles/scss/Projects.module.scss";
import { breakpoints } from "../../utils/breakpoints";
import { colorApplicator } from "../../utils/colorFunctions";
import { Project, projectsDataset } from "../../utils/dataset";
import { distanceLevels, parallax } from "../../utils/utility";

type NewProjectsProps = {
    updateCursorText: Function;
    cursorIsHover: Function;
    lightColor: string;
    darkColor: string;
    SSAnimFinished: Function;
    deviceType: breakpoints;
    lastEditDate: string
};

export default function NewProjects({
    updateCursorText,
    cursorIsHover,
    lightColor,
    darkColor,
    SSAnimFinished,
    deviceType,
    lastEditDate,
}: NewProjectsProps) {
    const [windowW, setWindowW] = useState<number>(0);
    const [dimensionsScale, setDimensionsScale] = useState<number>(1.4);
    const [triL, setTriL] = useState<number>(2 * dimensionsScale);
    const [halfTriL, setHalfTriL] = useState<number>(triL / 2);
    const [triP, setTriP] = useState<number>(triL * 0.1);
    const [triH, setTriH] = useState<number>((Math.sqrt(3) / 2) * triL);

    const triangleVertices = [
        new THREE.Vector3(0, triH / 2, 0),   // Top vertex
        new THREE.Vector3(-triL / 2, -triH / 2, 0), // Bottom left vertex
        new THREE.Vector3(triL / 2, -triH / 2, 0),  // Bottom right vertex
    ];
    const triangleInvVertices = [
        new THREE.Vector3(0, -triH / 2, 0),   // Top vertex
        new THREE.Vector3(-triL / 2, triH / 2, 0), // Bottom left vertex
        new THREE.Vector3(triL / 2, triH / 2, 0),  // Bottom right vertex
    ];

    const [triangleRows, setTriangleRows] = useState<number>(3);
    const [trianglesPerRow, setTrianglesPerRow] = useState<number>(4);
    const [firstPositionProject, setFirstPositionProject] = useState<number>(0);
    const [hoveredProjectID, setHoveredProjectID] = useState<number>(0);
    const [projectOpened, setProjectOpened] = useState<Project>(
        projectsDataset[0]
    );
    const [projectOpenedBoolean, setProjectOpenedBoolean] =
        useState<boolean>(false);
    const [projectIsHovered, setProjectIsHovered] = useState<boolean>(false);
    const zIndexMatteBKGOpen: number = 5;
    const zIndexMatteBKGClosed: number = -1;
    const [hasComponentMounted, setHasComponentMounted] = useState(false);

    useEffect(() => {
        colorApplicator(lightColor, darkColor);

        document.addEventListener("mousemove", mouseMoveHomepage);

        const lastEditTag = document.querySelector("#lastUpdateDate");
        if (lastEditTag && lastEditDate != null)
            lastEditTag.innerHTML = lastEditDate;

        // triangles Mgmt
        const updateTriangleCount = () => {
            const trianglesPerRow = Math.floor(window.innerWidth / triL / 10 / 5) + 2;
            console.log(window.innerWidth / triL, trianglesPerRow)
            setTrianglesPerRow(trianglesPerRow);

            const triangleRows = Math.floor(window.innerHeight / triH / 10 / 5) + 2;
            console.log(window.innerHeight, triH, triangleRows)
            setTriangleRows(triangleRows);
        };

        // Initial calculation
        updateTriangleCount();

        // Recalculate on window resize
        window.addEventListener("resize", updateTriangleCount);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousemove", mouseMoveHomepage);
            window.removeEventListener("resize", updateTriangleCount);
        };
    }, [triL]);

    useEffect(() => {
        if (SSAnimFinished && hasComponentMounted) {
            const tlInitial = gsap.timeline({ delay: 0.2 });
            tlInitial
                .to(".expContainer", {
                    duration: 0,
                    top: 80,
                    scale: 1,
                    opacity: 0.8,
                })
                .to(".expContainer", {
                    duration: 1.8,
                    top: 0,
                    scale: 1,
                    opacity: 1,
                });
        } else {
            setHasComponentMounted(true);
        }
    }, [SSAnimFinished]);



    function mouseMoveHomepage(event: MouseEvent | Event) {
        parallax(
            event,
            document.querySelector(".sectionBkgrdTxt"),
            distanceLevels.Second
        );
    }


    return (
        <>
            <Head>
                <title>Yassine - Selected Projects</title>
            </Head>
            <motion.div
                className={stylesHome.mainMotionDiv + " mainMotionDiv"}
                initial={{ x: "-50vw", opacity: 0 }}
                animate={{ x: "0vw", opacity: 1 }}
                exit={{ x: "-50vw", opacity: 0 }}
                transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
            >
                <h1 className={stylesHome.expBkgrdTxt + " sectionBkgrdTxt"} aria-label="Projects">
                    <span aria-hidden="true">P</span>
                    <span aria-hidden="true">r</span>
                    <span aria-hidden="true">o</span>
                    <span aria-hidden="true">j</span>
                    <span aria-hidden="true">e</span>
                    <span aria-hidden="true">c</span>
                    <span aria-hidden="true">t</span>
                    <span aria-hidden="true">s</span>
                </h1>
                <div
                    className={
                        stylesHome.currentPrjHovered +
                        " currentPrjHovered " +
                        (projectIsHovered ? stylesHome.hover : "")
                    }
                >
                    {projectsDataset.map((proj) => (
                        <Image
                            key={proj.id}
                            id={`bigBackgroundImage-${proj.id}`}
                            className={`bigBackgroundImage`}
                            priority={true}
                            src={proj.media[0]}
                            fill
                            alt="project"
                        />
                    ))}
                </div>
                <div className={stylesHome.modalMatteBkgrd + " modalMatteBkgrd"}></div>
                <div
                    className={
                        stylesHome.expContainer + ' ' + (projectsDataset.length % 2 ? stylesHome.odd : stylesHome.even) + " expContainer"
                    }
                >
                    <Canvas camera={{
                        position: [0, 0, -0.1]
                    }}>
                        <axesHelper args={[10]} />
                        {/* <OrbitControls enableDamping regress={true} dampingFactor={0.01} rotateSpeed={1} /> */}
                        <ambientLight intensity={Math.PI / 2} />
                        <directionalLight color="red" position={[0, 0, 5]} intensity={Math.PI * 4} />
                        {[...Array(triangleRows).keys()].map((_, extIndex) => {
                            const yIndex = Math.ceil(extIndex - (triangleRows / 2))
                            return <>
                                {
                                    [...Array(trianglesPerRow).keys()].map((_, intIndex) => {
                                        const xIndex = Math.ceil(intIndex - (trianglesPerRow / 2));
                                        return (
                                            <GenericTriangle key={intIndex}
                                                vertices={xIndex % 2 === 0 ? triangleInvVertices : triangleVertices}
                                                position={
                                                    new THREE.Vector3(
                                                        (xIndex < trianglesPerRow ?
                                                            xIndex * (-halfTriL - triP) :
                                                            xIndex > trianglesPerRow ?
                                                                xIndex * (halfTriL + triP) : 0) 
                                                        - (yIndex % 2 === 0 ? halfTriL + triP : 0), 
                                                        yIndex < triangleRows ? 
                                                            yIndex * (-triH - triP) :
                                                            yIndex > triangleRows ?
                                                                yIndex * (triH + triP) : 0, 5)}
                                                materialType="color"
                                                color="blue"
                                                opacity={0.3}
                                                index={intIndex}
                                            />
                                        )
                                    })
                                }
                            </>
                        })}

                        {/* First triangle with color */}


                        {/* Second triangle with color */}
                        {/* <GenericTriangle
                            vertices={triangleVertices}
                            position={new THREE.Vector3(0, 0, 5)}
                            materialType="color"
                            imageUrl="green"
                        /> */}

                        {/* Third triangle with color */}
                        {/* <GenericTriangle
                            vertices={triangleInvVertices}
                            position={new THREE.Vector3(halfTriL + triP, 0, 5)}
                            materialType="color"
                            color="blue"
                        /> */}

                        {/* <GenericTriangle vertices={vertices} position={[5, 5, 0]} color="red"/> */}
                    </Canvas>
                </div>
            </motion.div>
        </>
    );
}

export async function getStaticProps() {
    const lastEditDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return {
        props: {
            lastEditDate,
        },
    };
}



/* import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import './styles.css';

createRoot(document.getElementById('root')).render(
    ,
) */