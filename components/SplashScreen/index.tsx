/* eslint-disable @next/next/no-img-element */
import { animate } from "motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logoY from "../../public/logo/logo-Y.svg";
import { breakpoints } from "../../utils/breakpoints";
import ProgressBarCMD from "../ProgressBarCMD";
import TypingText from "../TypingText";
import styles from "./SplashScreen.module.scss";

type baseStringsType = {
  s1: string,
  s2: string,
  s3: string
}

type toTypeStringsType = {
  s1: string,
  s2: string,
  s3: string,
  s4: string,
  s5: string
}

export default function SplashScreen({
  setSSAnimFinished,
  deviceType
}) {
  const router = useRouter();
  const { pathname } = router;
  const sectionNamesRC = ["about", "projects"];

  const [baseStrings, setBaseStrings] = useState<baseStringsType>({
    s1: `C:\\Users\\yas> `,
    s2: `C:\\Users\\yas\\${sectionNamesRC[pathname === "/about" ? 0 : 1]}> `,
    s3: `C:\\Users\\yas\\${sectionNamesRC[pathname === "/about" ? 0 : 1]}\\yasRedesign> `,
  });

  const [toTypeStrings, setToTypeStrings] = useState<toTypeStringsType>({
    s1: `cd ${sectionNamesRC[pathname === "/about" ? 0 : 1]}`,
    s2: `cd yasRedesign`,
    s3: `code .`,
    s4: `npm run dev`,
    s5: `[··············································]`,
  });

  const [text1Completed, setText1Completed] = useState(false);
  const [text2Completed, setText2Completed] = useState(false);
  const [text3Completed, setText3Completed] = useState(false);
  const [text4Completed, setText4Completed] = useState(false);
  const [text5Completed, setText5Completed] = useState(false);

  useEffect(() => {
    if (deviceType != undefined) {
      let bs: baseStringsType;
      let tts: toTypeStringsType;
      if (deviceType === breakpoints.tablet || deviceType === breakpoints.mobile || deviceType === breakpoints.mobileSmall) {
        bs = {
          s1: `C:\\Users\\yas> `,
          s2: `...\\${sectionNamesRC[pathname === "/about" ? 0 : 1]}> `,
          s3: `...\\yasRedesign> `,
        }
        tts = {
          s1: `cd ${sectionNamesRC[pathname === "/about" ? 0 : 1]}`,
          s2: `cd yasRedesign`,
          s3: `code .`,
          s4: `npm run dev`,
          s5: `[···················]`,
        }
      } else {
        bs = {
          s1: `C:\\Users\\yas> `,
          s2: `C:\\Users\\yas\\${sectionNamesRC[pathname === "/about" ? 0 : 1]}> `,
          s3: `C:\\Users\\yas\\${sectionNamesRC[pathname === "/about" ? 0 : 1]}\\yasRedesign> `,
        }
        tts = {
          s1: `cd ${sectionNamesRC[pathname === "/about" ? 0 : 1]}`,
          s2: `cd yasRedesign`,
          s3: `code .`,
          s4: `npm run dev`,
          s5: `[··············································]`,
        }
      }
      if (bs !== baseStrings) {
        setBaseStrings(bs)
      }
      if (tts !== toTypeStrings) {
        setToTypeStrings(tts)
      }
    }
  }, [deviceType])

  useEffect(() => {
    if (text5Completed) {
      setTimeout(async () => {
        await animate("#SSContainer", {
          opacity: [1, 0],
        }, {
          duration: 0.2,
          ease: "easeIn",
        });
        await animate("#SSContainer", {
          maxHeight: 0,
          zIndex: -1,
        }, {
          duration: 0,
        })
      }, 550);
      setSSAnimFinished(true);
    }
  }, [text5Completed]);

  useEffect(() => {
    console.log('c')
    animate("#SSWrapper", {
      y: ["50%", "-30%"],
    }, {
      duration: 6.7,
      ease: [0, 0.7, 1, 0.3]
    })
    animate("#SSWrapper", {
      opacity: [0, 1]
    }, {
      duration: 0.1,
      ease: "easeOut"
    })
  }, [])

  return baseStrings && toTypeStrings ? (
    <div id={"SSContainer"} className={styles.SSContainer}>
      <img
        id={styles.logoImageSS}
        src={logoY.src}
        alt={`Yassine's Portfolio logo`}
      />
      <div id={"SSWrapper"} className={styles.SSWrapper}>
        <div className={styles.codeText}>
          <span>{baseStrings.s1}</span>
          <span>
            <TypingText
              text={toTypeStrings.s1}
              updateCompletion={setText1Completed}
            />
          </span>

          {text1Completed && (
            <>
              <br />
              <span>{baseStrings.s2}</span>
            </>
          )}
          <span>
            {text1Completed && (
              <TypingText
                text={toTypeStrings.s2}
                updateCompletion={setText2Completed}
              />
            )}
          </span>

          {text2Completed && (
            <>
              <br />
              <span>{baseStrings.s3}</span>
            </>
          )}
          <span>
            {text2Completed && (
              <TypingText
                text={toTypeStrings.s3}
                updateCompletion={setText3Completed}
              />
            )}
          </span>

          {text3Completed && (
            <>
              <br />
              <span>{baseStrings.s3}</span>
            </>
          )}
          <span>
            {text3Completed && (
              <TypingText
                text={toTypeStrings.s4}
                updateCompletion={setText4Completed}
              />
            )}
          </span>

          <span>
            {text4Completed && (
              <>
                <br />
                <ProgressBarCMD
                  text={toTypeStrings.s5}
                  updateCompletion={setText5Completed}
                />
              </>
            )}
          </span>
          {!text4Completed && <div className={styles.textCursor}></div>}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
