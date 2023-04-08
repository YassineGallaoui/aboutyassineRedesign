import { useEffect } from "react";
import styles from "./ProjectModal.module.scss"
import gsap from 'gsap';

export default function ProjectModal({ content, open, updateOpen }) {
    useEffect(()=>{
        if(open) {
            gsap.to(`.projectModalContainer`, {
                position: 'fixed', width: '90vw', height:'90vh', backgroundColor:'rgba(255,255,255,1)', 
                borderRadius: '30px', left: "50%", top: "50%", xPercent: -50, yPercent: -50, zIndex: '20', opacity: 1,
            });
        } else {
            gsap.to(`.projectModalContainer`, {
                position: 'fixed', height:'0vh', backgroundColor:'rgba(255,255,255,0)', 
                borderRadius: '0px', left: "50%", top: "-50%", xPercent: -50, yPercent: 0, zIndex: '20', opacity: 0,
            });
        }
    }, [open])

    const closeModal = () => {
        updateOpen(false);
    }

    const hoverCloseBtn = () => {
        gsap.to(`.closeModalBtn`, {transform: 'rotate(-90deg)'});
    }

    const notHoverCloseBtn = () => {
        gsap.to(`.closeModalBtn`, {transform: 'rotate(0deg)'});
    }

    return (
        <div className={styles.projectModalContainer + ' projectModalContainer'}>
            <div className={styles.projectCarousel}>
                <div className={styles.projectModalImage}></div>
            </div>
            <div className={styles.projectModalDescription}>
                <div className={styles.projectModalName}>{content.name}</div>
                <div className={styles.projectModalWorkingFor}>{'Working for : '}<span>{content.workingFor}</span></div> 
            </div>
            <div className={styles.closeModalBtn+' closeModalBtn'}
                onMouseOver={()=>hoverCloseBtn()} 
                onMouseLeave={()=>notHoverCloseBtn()}
                onClick={()=>closeModal()} />
        </div>
    )
}