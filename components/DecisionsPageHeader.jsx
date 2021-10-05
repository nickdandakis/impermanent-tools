import { useState, useEffect } from "react";
import {
  format,
  isAfter,
  isBefore,
  formatDuration,
  intervalToDuration,
} from "date-fns";

import stages, { revealDate } from "../data/stages";

const now = new Date(Date.now());

const activeStage = stages.find(
  (stage) => isAfter(now, stage.startsAt) && isBefore(now, stage.endsAt)
);
const activeStageIndex = stages.findIndex(
  (stage) => stage.label === activeStage.label
);
const nextStage =
  activeStageIndex !== stages.length - 1 ? stages[activeStageIndex + 1] : null;

const getCountdownFromReveal = () =>
  intervalToDuration({
    start: revealDate,
    end: Date.now(),
  });
const getCountdownToNextStage = () =>
  intervalToDuration({
    start: Date.now(),
    end: nextStage.startsAt,
  });

function DecisionsPageHeader() {
  const [isShowingCountdowns, setIsShowingCountdowns] = useState(true);
  const [countdownFromReveal, setCountdownFromReveal] = useState(
    getCountdownFromReveal()
  );
  const [countdownToNextStage, setCountdownToNextStage] = useState(
    getCountdownToNextStage()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownFromReveal(getCountdownFromReveal());
      setCountdownToNextStage(getCountdownToNextStage());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDateCountdownClick = (event) => {
    event.preventDefault();

    setIsShowingCountdowns(
      (previousIsShowingCountdowns) => !previousIsShowingCountdowns
    );
  };

  return (
    <header>
      <h1>Decisions, decisions</h1>
      <p>
        We are currently in <strong>{activeStage.label}</strong>.<br />
        Reveal happened&nbsp;
        <a href="#" onClick={handleDateCountdownClick}>
          {isShowingCountdowns
            ? formatDuration(countdownFromReveal, { delimiter: ", " }) + " ago"
            : "at " + format(revealDate, "yyyy-MM-dd HH:mm:ssxxx")}
        </a>
        .<br />
        {nextStage && (
          <>
            {nextStage.label} (the next stage) starts&nbsp;
            <a href="#" onClick={handleDateCountdownClick}>
              {isShowingCountdowns
                ? "in " +
                  formatDuration(countdownToNextStage, { delimiter: ", " })
                : "at " + format(nextStage.startsAt, "yyyy-MM-dd HH:mm:ssxxx")}
            </a>
            .
          </>
        )}
      </p>
      <h2>
        Run through your decisions one step at a time, completely hypothetically
      </h2>
      <style jsx>{`
        header {
          margin-bottom: 30px;
        }

        p {
          max-width: 60ch;
          margin: 0 auto;
          line-height: 1.5;
          font-weight: 20px;
        }
      `}</style>
    </header>
  );
}

export default DecisionsPageHeader;
