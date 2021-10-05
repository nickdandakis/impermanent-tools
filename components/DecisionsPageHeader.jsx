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
  (stage) => stage.heading === activeStage.heading
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
        We are currently in <strong>{activeStage.heading}</strong>.<br />
        Reveal happened&nbsp;
        <a href="#" onClick={handleDateCountdownClick}>
          {isShowingCountdowns
            ? formatDuration(countdownFromReveal, { delimiter: ", " }) + " ago"
            : "at " + format(revealDate, "yyyy-MM-dd HH:mm:ssxxx")}
        </a>
        .<br />
        {nextStage && (
          <>
            {nextStage.heading}, the next stage, starts&nbsp;
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
        Simulate all the possible decisions and outcomes at every stage for
        Impermanent Digital ID:
      </h2>
      <style jsx>{`
        header {
          margin-bottom: 30px;
          text-align: left;
        }

        p {
          line-height: 1.5;
          font-weight: 20px;
        }
      `}</style>
    </header>
  );
}

export default DecisionsPageHeader;
