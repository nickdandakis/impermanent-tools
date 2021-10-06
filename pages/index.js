import Image from "next/image";

import PageLayout from "../components/PageLayout";

function IndexPage() {
  return (
    <div>
      <Image src="/images/roadmap.png" width={400} height={402} />
    </div>
  );
}

IndexPage.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default IndexPage;
