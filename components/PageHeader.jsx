import Image from "next/image";
import Link from "next/link";

function PageHeader({ links = null }) {
  return (
    <header>
      <Link href="/">
        <a className="logo-wrapper">
          <Image src="/images/impermanent-logo.png" width="219" height="49" />
        </a>
      </Link>
      <div className="right">
        {links || (
          <>
            <Link href="/compare">
              <a>Compare</a>
            </Link>
            <Link href="/decisions">
              <a>Decisions</a>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        header {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          width: 100%;
        }

        .logo-wrapper {
          display: block;
          max-width: 200px;
        }

        .right > * {
          padding: 0 10px;
          font-weight: bold;
          font-family: "Terminal Grotesque";
        }

        @media (max-width: 500px) {
          .logo-wrapper {
            max-width: 150px;
          }
        }
      `}</style>
    </header>
  );
}

export default PageHeader;
