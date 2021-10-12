import Image from "next/image";
import Link from "next/link";

import PageLayout from "../components/PageLayout";

function IndexPage() {
  return (
    <div>
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
