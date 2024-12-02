/* eslint-disable @next/next/no-img-element */
import { motion } from "motion/react";
import Link from "next/link";
import { TitleBackground } from "../components/TitleBackground";
import daigiacomo from "../public/imgs/DAIGIACOMO.jpg";
import styles404 from "../styles/scss/General.module.scss";

export default function Custom404({ cursorIsHover, SSAnimFinished }) {
    return (
        <motion.div
            initial={{ x: "50dvw", opacity: 0 }}
            animate={{ x: "0dvw", opacity: 1 }}
            exit={{ x: "50dvw", opacity: 0 }}
            transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }} className={styles404.PNFcontainer}>
            <div className={styles404.bgTitle}>
                {SSAnimFinished && <TitleBackground text={"404"} />}
            </div>
            <p className={styles404.firstP}>{`Page Not Found`}</p>
            <div className={styles404.imgContainer}>
                <img src={daigiacomo.src} alt="Dai giacomo, andiamo via" />
                <span>{`( from the movie "Tre uomini e una gamba", 1997 )`}</span>
            </div>
            <Link href="/" onMouseOver={() => cursorIsHover()}>
                Return to Homepage
            </Link>
        </motion.div>
    );
};
