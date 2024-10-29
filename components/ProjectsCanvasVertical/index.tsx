import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from 'three';
import { projectsDataset } from "../../utils/dataset";
import { CanvasLightning } from "../CanvasLightning";
import GenericTriangle from "../GenericTriangle";
import ProjectTriangle from "../ProjectTriangle";

type ProjectCanvasVerticalProps = {
  triangleMouseOver: Function,
  triangleMouseOut: Function,
  triangleMouseClick: Function,
  projsNumber: number
};

export default function ProjectCanvasVertical({
  triangleMouseOver,
  triangleMouseOut,
  triangleMouseClick,
  projsNumber,
}: ProjectCanvasVerticalProps) {

  const [dimensionsScale, setDimensionsScale] = useState<number>(1);
  const [triL, setTriL] = useState<number>(4 * dimensionsScale);
  const [halfTriL, setHalfTriL] = useState<number>(triL / 2);
  const [triP, setTriP] = useState<number>(triL * 0.07);
  const [triGap, setTriGap] = useState<number>(halfTriL + triP);
  const [triH, setTriH] = useState<number>((Math.sqrt(3) / 2) * triL);

  const [triangleRows, setTriangleRows] = useState<number>(3);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(4);
  const [firstPositionProject, setFirstPositionProject] = useState<number>(0);

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
        scale = 0.6 + ((width - minW) / (maxW - minW)) * (1 - 0.6);
      }

      setDimensionsScale(scale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const newTriL = 4 * dimensionsScale;
    const newHalfTriL = newTriL / 2;
    const newTriP = newTriL * 0.07;
    const newTriGap = newHalfTriL + newTriP;
    const newTriH = (Math.sqrt(3) / 2) * newTriL;

    const newT = [
      new THREE.Vector3(-triH / 2, 0, 0),   // left vertex
      new THREE.Vector3(triH / 2, triL / 2, 0), // top right vertex
      new THREE.Vector3(triH / 2, -triL / 2, 0),  // bottom right vertex
    ];

    const newIT = [
      new THREE.Vector3(triH / 2, 0, 0),   // right vertex
      new THREE.Vector3(-triH / 2, triL / 2, 0), // top left vertex
      new THREE.Vector3(-triH / 2, -triL / 2, 0),  // bottom left vertex
    ];

    setTriL(newTriL);
    setHalfTriL(newHalfTriL);
    setTriP(newTriP);
    setTriGap(newTriGap);
    setTriH(newTriH);
    setTriangleVertices(newT);
    setTriangleInvVertices(newIT);
  }, [dimensionsScale]);

  useEffect(() => {
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
      window.removeEventListener("resize", updateTriangleCount);
    };
  }, [])
  return (
    <Canvas shadows camera={{
      position: [0, 0, -0.1]
    }}>
      {/* <axesHelper args={[10]} /> */}
      {/* <OrbitControls enableDamping regress={true} dampingFactor={0.01} rotateSpeed={1} /> */}
      <CanvasLightning />
      {[...Array(triangleRows).keys()].map((_, extIndex) => {
        const yIndex = Math.ceil(extIndex - (triangleRows / 2))
        return <mesh key={extIndex}>
          {
            [...Array(trianglesPerRow).keys()]
              .map((_, intIndex) => {
                const xIndex = Math.floor(intIndex - (trianglesPerRow / 2));
                const posY = (xIndex < trianglesPerRow ?
                  xIndex * (-triGap) :
                  xIndex > trianglesPerRow ?
                    xIndex * (triGap) : 0)
                  - (projsNumber % 2 === 0 ? triGap / 2 : 0);
                const posX = (yIndex < triangleRows ?
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
    </Canvas>
  );
}
