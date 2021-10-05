import DiscordLogo from "../components/DiscordLogo";
import TwitterLogo from "../components/TwitterLogo";
import GithubLogo from "../components/GithubLogo";
import OpenSeaLogo from "../components/OpenSeaLogo";
import metadataMeta from "../data/metadata-meta.json";

function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="left">
        <span className="last-updated">
          Last updated: {new Date(metadataMeta.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <div className="right">
        <a
          href="https://opensea.io/collection/impermanent-digital"
          target="_blank"
          rel="noreferrer"
        >
          <OpenSeaLogo />
        </a>
        <a
          href="http://twitter.com/impermanentID"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterLogo />
        </a>
        <a
          href="https://discord.gg/p4N4z9Mydk"
          target="_blank"
          rel="noreferrer"
        >
          <DiscordLogo />
        </a>
        <a
          href="https://github.com/nickdandakis/impermanent-tools/"
          target="_blank"
          rel="noreferrer"
        >
          <GithubLogo />
        </a>
      </div>
      <style jsx>{`
        .page-footer {
          box-sizing: border-box;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 10px 20px;
        }

        .right {
          flex: 1 1 60%;
          display: flex;
          flex-flow: row wrap;
          width: 100%;
          text-align: right;
          justify-content: flex-end;
          align-items: center;
        }

        .right > * {
          padding: 10px 18px;
        }

        .left {
          flex: 1 1 40%;
          text-align: left;
          font-size: 14px;
        }

        @media (max-width: 500px) {
          .left {
            width: 100%;
            flex-basis: 100%;
            text-align: center;
            justify-content: center;
            order: 1;
            padding-top: 10px;
            padding-bottom: 10px;
          }

          .right {
            width: 100%;
            flex-basis: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default PageFooter;
