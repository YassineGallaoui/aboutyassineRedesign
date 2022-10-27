import styles from '../../styles/Frame.module.css'

export default function Frame() {
    return (
        <div className={styles.frameContainer}>
            <div className={styles.frameContainer__left}>
                <div className={styles.frameContainer__left__logo}>logo</div>
                <div className={styles.frameContainer__left__lastUpdate}>Last update: 23 Oct 2022</div>
            </div>
            <div className={styles.frameContainer__right}>
                <div className={styles.frameContainer__right__theme}>theme</div>
                <div className={styles.frameContainer__right__nav}>
                    <ul>
                        <li>
                            <span>Who am I</span>
                        </li>
                        <li>
                            <span>What I do</span>
                        </li>
                        <li>
                            <span>How I do it</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.frameContainer__right__contacts}>contacts</div>
            </div>
        </div>
    )
}