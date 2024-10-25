import { Canvas, ThreeElements } from "@react-three/fiber";
import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import GenericTriangle from "../components/GenericTriangle";
import { LightPointer } from "../components/LightPointer";
import ProjectModal from "../components/ProjectModal";
import ProjectModalVertical from "../components/ProjectModalVertical";
import ProjectTriangle from "../components/ProjectTriangle";
import SlideinText from "../components/SlideinText";
import stylesHome from "../styles/scss/Projects.module.scss";
import { breakpoints, getDeviceType } from "../utils/breakpoints";
import { colorApplicator } from "../utils/colorFunctions";
import { Project, projectsDataset } from "../utils/dataset";
import { distanceLevels, hideFrame, parallax, unhideFrame } from "../utils/utility";

type NewProjectsProps = {
  updateCursorText: Function;
  cursorIsHover: Function;
  lightColor: string;
  darkColor: string;
  SSAnimFinished: Function;
  deviceType: breakpoints;
  lastEditDate: string
};

function BoxCustom(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState(false)
  return (
    <mesh
      {...props}
      ref={meshRef}
      rotation={[1,1,1]}
      scale={active ? 1.5 : 1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#2f74c0'} />
    </mesh>
  )
}

export default function NewProjects({
  lightColor,
  darkColor,
  updateCursorText,
  cursorIsHover,
  SSAnimFinished,
  deviceType,
  lastEditDate,
}: NewProjectsProps) {
  const [dimensionsScale, setDimensionsScale] = useState<number>(1);
  const [triL, setTriL] = useState<number>(4 * dimensionsScale);
  const [halfTriL, setHalfTriL] = useState<number>(triL / 2);
  const [triP, setTriP] = useState<number>(triL * 0.07);
  const [triGap, setTriGap] = useState<number>(halfTriL + triP);
  const [triH, setTriH] = useState<number>((Math.sqrt(3) / 2) * triL);
  const [projsNumber, setProjsNumber] = useState<number>(projectsDataset.length)
  const [triangleRows, setTriangleRows] = useState<number>(3);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(4);
  const [firstPositionProject, setFirstPositionProject] = useState<number>(0);
  
  const [projectOpenedBoolean, setProjectOpenedBoolean] = useState<boolean>(false);
  const [projectOpened, setProjectOpened] = useState<Project>(projectsDataset[0]);
  
  const [projectIsHovered, setProjectIsHovered] = useState<boolean>(false);
  const [projectIsHoveredID, setProjectIsHoveredID] = useState<number|null>(null);
  
  const zIndexMatteBKGOpen: number = 5;
  const zIndexMatteBKGClosed: number = -1;
  const [hasComponentMounted, setHasComponentMounted] = useState(false);

  const [triangleVertices, setTriangleVertices] = useState([
    new THREE.Vector3(0, triH / 2, 0),   // Top vertex
    new THREE.Vector3(-triL / 2, -triH / 2, 0), // Bottom left vertex
    new THREE.Vector3(triL / 2, -triH / 2, 0),  // Bottom right vertex
  ]);
  const [triangleInvVertices, setTriangleInvVertices] = useState([
    new THREE.Vector3(0, -triH / 2, 0),   // Top vertex
    new THREE.Vector3(-triL / 2, triH / 2, 0), // Bottom left vertex
    new THREE.Vector3(triL / 2, triH / 2, 0),  // Bottom right vertex
  ]);

  const triangleMouseOver = (elementId: number) => {
    const elementData = projectsDataset.find(
      (proj) => proj.id === elementId
    );
    if (elementId != null && elementData != null) {
      setProjectIsHovered(true);
      setProjectIsHoveredID(elementId);
      
      const tl1 = gsap.timeline();
      tl1.to(`#bigBackgroundImage-${elementId}`, {
        scale: 1.02,
        duration: 5,
        ease: "expo.out",
      });
      tl1.to(
        `#bigBackgroundImage-${elementId}`,
        {
          opacity: 1,
          duration: 2,
          ease: "expo.out",
        },
        0
      );
      cursorIsHover(true);
    }
  }

  const triangleMouseOut = (elementId: number) => {
    const elementData = projectsDataset.find(
      (proj) => proj.id === elementId
    );
    if (elementId != null && elementData != null) {
      setProjectIsHovered(false);
      const tl1 = gsap.timeline();
      gsap.killTweensOf(`#bigBackgroundImage-${elementId}`);
      tl1.to(`#bigBackgroundImage-${elementId}`, {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        delay: 0,
        ease: "expo.out",
      });
      cursorIsHover(false);
    }
  }

  const triangleMouseClick = (elementId: number) => {
    const currentPrj = projectsDataset.find((el) => el.id === elementId);
    setProjectOpened(currentPrj);
    setProjectOpenedBoolean(true);
  }

  useEffect(() => {
    const newTriL = 4 * dimensionsScale;
    const newHalfTriL = newTriL / 2;
    const newTriP = newTriL * 0.07;
    const newTriGap = newHalfTriL + newTriP;
    const newTriH = (Math.sqrt(3) / 2) * newTriL;
    const newT = [
      new THREE.Vector3(0, triH / 2, 0),   // Top vertex
      new THREE.Vector3(-triL / 2, -triH / 2, 0), // Bottom left vertex
      new THREE.Vector3(triL / 2, -triH / 2, 0),  // Bottom right vertex
    ];
    const newIT = [
      new THREE.Vector3(0, -triH / 2, 0),   // Top vertex
      new THREE.Vector3(-triL / 2, triH / 2, 0), // Bottom left vertex
      new THREE.Vector3(triL / 2, triH / 2, 0),  // Bottom right vertex
    ];

    setTriL(newTriL);
    setHalfTriL(newHalfTriL);
    setTriP(newTriP);
    setTriGap(newTriGap);
    setTriH(newTriH);
    setTriangleVertices(newT);
    setTriangleInvVertices(newIT);
  }, [dimensionsScale]);

  // Calculate the scaling factor based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let scale = 1;

      const minW = 400;
      const maxW = 1600;

      if (width <= minW) {
        scale = 0.6;
      } else if (width >= maxW) {
        scale = 1;
      } else {
        // Interpolate scale value between minW and maxW
        scale = 0.6 + ((width - minW) / (maxW - minW)) * (1 - 0.6);
      }

      setDimensionsScale(scale);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    if (projectOpenedBoolean) {
      gsap.to(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0.8)",
        zIndex: zIndexMatteBKGOpen,
      });
    } else {
      gsap.to(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0)",
        zIndex: zIndexMatteBKGClosed,
      });
    }

    const themeContainer = document.querySelector(
      ".themeContainer"
    ) as HTMLElement;
    if (
      getDeviceType() === breakpoints.mobile ||
      getDeviceType() === breakpoints.mobileSmall ||
      getDeviceType() === breakpoints.tablet
    )
      if (projectOpenedBoolean) hideFrame(themeContainer);
      else unhideFrame(themeContainer);
  }, [projectOpenedBoolean]);

  useEffect(() => {
    colorApplicator(lightColor, darkColor);

    document.addEventListener("mousemove", mouseMoveHomepage);

    const lastEditTag = document.querySelector("#lastUpdateDate");
    if (lastEditTag && lastEditDate != null)
      lastEditTag.innerHTML = lastEditDate;

    const updateTriangleCount = () => {
      let trianglesPerRow = 40
      let triangleRows = 11
      const fp = Math.ceil((trianglesPerRow - projsNumber) / 2) + (trianglesPerRow % 2 === 1 && projsNumber % 2 === 1 ? 1 : 0);

      setTrianglesPerRow(trianglesPerRow);
      setTriangleRows(triangleRows);
      setFirstPositionProject(fp);
    };

    updateTriangleCount();

    window.addEventListener("resize", updateTriangleCount);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHomepage);
      window.removeEventListener("resize", updateTriangleCount);
    };
  }, [triL, projsNumber]);

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

  const mouseMoveHomepage = (event: MouseEvent | Event) => {
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
        {/* <TestComp projsNumber={projsNumber} setProjsNumber={setProjsNumber} /> */}
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
        <div
          className={
            stylesHome.currentPrjHoveredText +
            " currentPrjHoveredText "
          }
        >
          {projectsDataset.map((proj) => (
            <SlideinText key={proj.id} text={proj.name} isHovered={projectIsHoveredID === proj.id && projectIsHovered ? true : false}/>
          ))}
        </div>
        <div className={stylesHome.modalMatteBkgrd + " modalMatteBkgrd"}></div>
        <div
          className={
            stylesHome.expContainer + ' ' + (projsNumber % 2 ? stylesHome.odd : stylesHome.even) + " expContainer"
          }
        >
          <Canvas shadows camera={{
            position: [0, 0, -0.1]
          }}>
            {/* <axesHelper args={[10]} /> */}
            {/* <OrbitControls enableDamping regress={true} dampingFactor={0.01} rotateSpeed={1} /> */}
            {/* <ambientLight color="blue" intensity={Math.PI * 40000} /> */}
            {/* <directionalLight color="red" position={[0, 0, 5]} intensity={Math.PI * 4} /> */}
            <LightPointer />
            {[...Array(triangleRows).keys()].map((_, extIndex) => {
              const yIndex = Math.ceil(extIndex - (triangleRows / 2))
              return <mesh key={extIndex}>
                {
                  [...Array(trianglesPerRow).keys()]
                    .map((_, intIndex) => {
                      const xIndex = Math.floor(intIndex - (trianglesPerRow / 2));
                      const posX = (xIndex < trianglesPerRow ?
                        xIndex * (-triGap) :
                        xIndex > trianglesPerRow ?
                          xIndex * (triGap) : 0)
                        - (projsNumber % 2 === 0 ? triGap / 2 : 0);
                      const posY = (yIndex < triangleRows ?
                        yIndex * (-triH - (triP * 0.9)) :
                        yIndex > triangleRows ?
                          yIndex * (triH + (triP * 0.9)) : 0);
                      const isThisAProject = intIndex >= firstPositionProject
                        && intIndex < firstPositionProject + projsNumber
                        && extIndex === Math.floor(triangleRows / 2);

                      return (
                        !isThisAProject ?
                          <GenericTriangle key={intIndex}
                            vertices={intIndex % 2 === (extIndex % 2 === 1 ? 0 : 1) ? triangleInvVertices : triangleVertices}
                            position={new THREE.Vector3(posX, posY, 6)}
                            materialType={"color"}
                            color={"rgb(0,0,0)"}
                            opacity={0.1}
                            indexX={intIndex}
                            indexY={extIndex}
                            totX={trianglesPerRow}
                            scale={dimensionsScale}
                          ></GenericTriangle> :
                          <ProjectTriangle
                            key={intIndex}
                            upsideDown={intIndex % 2 === (extIndex % 2 === 1 ? 0 : 1)}
                            vertices={intIndex % 2 === (extIndex % 2 === 1 ? 0 : 1) ? triangleInvVertices : triangleVertices}
                            position={new THREE.Vector3(posX, posY, 6)}
                            projectData={projectsDataset[intIndex - firstPositionProject]}
                            imageUrl={projectsDataset[intIndex - firstPositionProject].media[0]}
                            triangleMouseOver={(e) => { triangleMouseOver(e) }}
                            triangleMouseOut={(e) => { triangleMouseOut(e) }}
                            triangleMouseClick={(e) => { triangleMouseClick(e) }}
                            scale={dimensionsScale}
                          ></ProjectTriangle>
                      )
                    })
                }
              </mesh>
            })}
            {/* <BoxCustom position={[0, 0, 6]} /> */}
          </Canvas>
        </div>
        {deviceType === breakpoints.mobileSmall ||
          deviceType === breakpoints.mobile ? (
          <ProjectModalVertical
            content={projectOpened}
            open={projectOpenedBoolean}
            updateOpen={setProjectOpenedBoolean}
            updateCursorText={updateCursorText}
            cursorIsHover={cursorIsHover}
          />
        ) : (
          <ProjectModal
            content={projectOpened}
            open={projectOpenedBoolean}
            updateOpen={setProjectOpenedBoolean}
            updateCursorText={updateCursorText}
            cursorIsHover={cursorIsHover}
          />
        )}
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