import { useState, useEffect } from "react";
import { format, isAfter, isBefore, intervalToDuration } from "date-fns";

import stages, { revealDate } from "../data/stages";
import DatesList from "../components/DatesList";

const now = new Date(Date.now());

const activeStage = stages.find(
  (stage) => isAfter(now, stage.startsAt) && isBefore(now, stage.endsAt)
);
const activeStageIndex = stages.findIndex(
  (stage) => stage.heading === activeStage.heading
);
const nextStage =
  activeStageIndex !== stages.length - 1 ? stages[activeStageIndex + 1] : null;

function SimulatePageFooter() {
  return (
    <footer>
      <p>
        Simulate all the possible decisions and outcomes at every stage for
        Impermanent Digital ID.
      </p>
      <div className="dates-list-section">
        <div className="dates-list-wrapper">
          <DatesList
            label="Revealed"
            startsAt={revealDate}
            endsAt={revealDate}
            initialIsToggledFormat={true}
          />
        </div>
        <div className="dates-list-wrapper">
          <DatesList
            label={`${activeStage.heading} — Current`}
            startsAt={activeStage.startsAt}
            endsAt={activeStage.endsAt}
          />
        </div>
        <div className="dates-list-wrapper">
          <DatesList
            label={`${nextStage.heading} — Up next`}
            startsAt={nextStage.startsAt}
            endsAt={nextStage.endsAt}
          />
        </div>
      </div>
      <small>
        For burn decisions at all levels, your original ID ERC-721 token is
        burned, and your Afterlife ID is minted as a new ERC-721 token.
        <br />
        Burning costs gas, evolving is free.
        <br />
        Following this current series of 4444 (Punks), IDs will roll out in 3
        more series — each &apos;killing&apos; off an existing collection.
        <br />
        Signature Edition 1/1s do not participate in the Lifecycle, and receive
        an Afterlife 3 ID in addition to their 1/1, no burn required.
        <br />
        *only the first 50% of burned Lifecycle 1 IDs will be whitelisted for
        the 3333 edition series to follow.
      </small>
      <style jsx>{`
        footer {
          margin-bottom: 30px;
          text-align: left;
        }

        .dates-list-section {
          background: #eeeeee;
          padding: 20px;
          border-radius: 3px;
          margin-bottom: 20px;
        }

        .dates-list-wrapper + .dates-list-wrapper {
          margin-top: 20px;
        }

        p {
          line-height: 1.5;
          font-weight: 20px;
          margin-top: 0;
        }

        small {
          font-size: 10px;
          line-height: 1;
        }
      `}</style>
    </footer>
  );
}

export default SimulatePageFooter;
