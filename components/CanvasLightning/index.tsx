import useScreenInfo from "../../hooks/useScreenInfo";
import { LightPointer } from "../LightPointer";

export const CanvasLightning = () => {
    const screenInfo = useScreenInfo();
    
    return (
        <>
            {screenInfo?.isTouchOnly && <ambientLight intensity={Math.PI * 0.4} />}
            {screenInfo?.hasMouse && <LightPointer />}
            {/* <directionalLight color="red" position={[0, 0, 5]} intensity={Math.PI * 4} /> */}
        </>
    );
};