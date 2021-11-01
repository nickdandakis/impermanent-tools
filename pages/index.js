import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import PageLayout from "../components/PageLayout";

function IndexPage() {
  return (
    <div>
      <Head>
        <title key="title">Impermanent Tools</title>
        <meta
          name="description"
          content="Community-created tools for the beloved Impermanent Digital collection."
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.impermanent.tools/images/comparison-og-image.png"
          key="og:image"
        />
      </Head>
      <Link href="/timeline">
        <a>
          <Image src="/images/roadmap.png" width={400} height={402} />
        </a>
      </Link>
    </div>
  );
}

IndexPage.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default IndexPage;
