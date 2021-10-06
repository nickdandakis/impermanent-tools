import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";

function PageLayout({ headerLinks = null, children }) {
  return (
    <div className="page">
      <PageHeader links={headerLinks} />
      <main>{children}</main>
      <PageFooter />
      <style jsx>{`
        .page {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
          justify-content: space-between;
          min-height: 100vh;
        }

        main {
          flex: 1;
          padding: 0 20px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default PageLayout;
