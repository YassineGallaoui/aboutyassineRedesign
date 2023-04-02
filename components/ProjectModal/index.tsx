import { useEffect } from "react";
import styles from "../../styles/ProjectModal.module.css"

export default function ProjectModal({ content }) {
    return (
        <div className={styles.projectModalContainer + ' projectModalContainer'}>
            <div className={styles.projectCarousel}>
                <div className={styles.projectModalImage}></div>
            </div>
            <div className={styles.projectModalDescription}>
                <div>{content.name}</div>
                <div>{'Working for : '+content.workingFor}</div> 
            </div>
        </div>
    )
}