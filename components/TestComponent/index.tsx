import { ChangeEvent } from "react";
import styles from "./TestComponent.module.scss";

export default function TestComp({ projsNumber, setProjsNumber }) {
    
    const changeHandler = (e:ChangeEvent) => {
        const eTar = e.target as HTMLInputElement;
        const newVal: number = parseInt(eTar.value);
        setProjsNumber(newVal);
    }

    return (
        <div className={styles.testContainer + " testContainer"}>
            <input type="number" value={projsNumber} onChange={(e)=>changeHandler(e)}/>
        </div>
    ) ;
}
