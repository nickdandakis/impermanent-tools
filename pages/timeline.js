import { useState, useEffect, useRef, forwardRef } from "react";
import { differenceInSeconds } from "date-fns";

import { SubHeading } from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import DateLine from "../components/DateLine";

import stages, { revealDate } from "../data/stages";

const totalSeconds = differenceInSeconds(
  stages[stages.length - 1].startsAt,
  revealDate
);

function TimelinePage() {
  const [secondsFromStart, setSecondsFromStart] = useState(
    differenceInSeconds(new Date(Date.now()), revealDate)
  );
  const nowRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsFromStart(
        differenceInSeconds(new Date(Date.now()), revealDate)
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsFromStart, setSecondsFromStart]);

  useEffect(() => {
    nowRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [nowRef]);

  const handleJumpToNow = () => {
    nowRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="timeline-page">
      <div className="container">
        <div className="legend">
          <button onClick={handleJumpToNow} className="button">
            ⏱ Jump to now
          </button>
          <h1>1px = 10mins</h1>
          <h1>gmi?</h1>
        </div>
        <div className="timeline" />
        <div className="now-wrapper">
          <DateLine
            ref={nowRef}
            className="now"
            date={new Date(Date.now())}
            label="You are here"
            secondsFromStart={secondsFromStart}
          />
        </div>
        {stages.map((stage, i) => (
          <DateLine
            className="stage"
            date={stage.startsAt}
            label={stage.heading}
            secondsFromStart={differenceInSeconds(stage.startsAt, revealDate)}
            key={i}
          />
        ))}
      </div>

      <style jsx>{`
        .timeline-page {
          width: 100%;
        }

        h1 {
          font-family: "Authentic Sans";
          font-size: 18px;
        }

        .container {
          position: relative;
          width: 100%;
          text-align: left;
        }

        .timeline {
          width: 3px;
          background-color: black;
          height: ${totalSeconds / (6 * 60)}px;
          margin: 0 auto;
        }

        .now-wrapper {
          color: red;
        }

        .stage {
          color: green;
        }

        .legend {
          position: fixed;
          bottom: 40px;
          left: 40px;
          text-align: left;
        }

        .legend h1 {
          font-size: 12px;
        }

        .button {
          padding: 0;
        }
      `}</style>
    </div>
  );
}

TimelinePage.getLayout = (page) => {
  return (
    <PageLayout subHeading={<SubHeading heading="Timeline Visualizer" />}>
      {page}
    </PageLayout>
  );
};

export default TimelinePage;
