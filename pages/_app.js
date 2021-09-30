// import App from 'next/app'
import Head from 'next/head';

import '../styles/typography.css';
import '../styles/base.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title key="title">
          Impermanent Tools
        </title>
        <meta
          name="description"
          content="Compare CryptoPunk with Impermanent Digital"
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.impermanent.tools/images/comparison-og-image.png"
          key="og:image"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
