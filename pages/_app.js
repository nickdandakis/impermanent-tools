import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/typography.css";
import "../styles/base.css";

const queryClient = new QueryClient();

function Application({ Component, pageProps }) {
  // persistent layouts from:
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  // eslint-disable-next-line react/prop-types
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title key="title">Impermanent Tools</title>
        <meta
          name="description"
          content="Compare CryptoPunk with Impermanent Digital, and vice-versa"
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.impermanent.tools/images/comparison-og-image.png"
          key="og:image"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </>
  );
}

export default Application;
