import PageLayout from "../components/PageLayout";

function IndexPage() {
  return (
    <div>
      <h1>
        Community-maintained tools for the&nbsp;
        <a href="https://impermanent.digital">Impermanent Digital</a>&nbsp;
        collection
      </h1>
    </div>
  );
}

IndexPage.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default IndexPage;
