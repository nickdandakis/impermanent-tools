import Image from "next/image";
import Link from "next/link";

import splitToChunks from "../utils/splitToChunks";

export const SubHeading = ({ heading }) => {
  const parts = heading.split(" ");
  const chunks = splitToChunks(parts, 2);
  const blackPart = chunks[0].join(" ");
  const greenPart = chunks[1].join(" ");

  return (
    <h2 className="sub-heading">
      <span className="black">{blackPart}</span>
      &nbsp;
      <span className="green">{greenPart}</span>
      <style jsx>{`
        .sub-heading {
          font-family: "Terminal Grotesque";
          font-size: 24px;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          margin-bottom: 0;
          margin-top: 5px;
        }

        .sub-heading .black {
          color: black;
          font-weight: bold;
        }

        .sub-heading .green {
          color: #9bfc75;
          font-weight: normal;
        }
      `}</style>
    </h2>
  );
};

function PageHeader({ links = null, subHeading = null }) {
  return (
    <header>
      <Link href="/">
        <a className="logo-wrapper">
          <Image src="/images/impermanent-logo.png" width="219" height="49" />
          {subHeading}
        </a>
      </Link>
      <div className="right">
        {links || (
          <>
            <Link href="/compare">
              <a>
                <span className="emoji-wrapper">🔬</span>
                <span className="label">&nbsp;Compare</span>
              </a>
            </Link>
            <Link href="/simulate">
              <a>
                <span className="emoji-wrapper">👁‍🗨</span>
                <span className="label">&nbsp;Simulate</span>
              </a>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        header {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: flex-start;
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

          .label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

export default PageHeader;
