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
          content="You are wasting my time. Most of us are investors so let's be straight: if this project does not get the shit done as it promised, I will sell all my double-figure NFTs and leave.  You waste all the golden time to promote yourself, sad to see this."
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.impermanent.tools/images/goons-on-moon-og-image.jpg"
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
