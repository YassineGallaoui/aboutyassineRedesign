import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="./Yassine Icon.ico"></link>
        <meta name="description" content="This is Yassine's portfolio"></meta>
      </Head>
      <body id={"pageBody"}>
        <div className={"lightMode"}></div>
        <div className={"darkMode"}></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
