import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
        <link rel="icon" type="image/x-icon" href="./Yassine Icon.ico"></link>
        <meta name="description" content="This is Yassine's portfolio"></meta>
        <script
          defer
          data-domain="yassinegallaoui.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body id={"pageBody"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
