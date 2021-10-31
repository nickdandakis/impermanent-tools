import { forwardRef } from "react";
import { format } from "date-fns";

const FORMAT_STRING = "yyyy-MM-dd HH:mm:ss (xxx)";

const DateLine = forwardRef(({ date, label, secondsFromStart }, ref) => {
  return (
    <div className="date-section" ref={ref}>
      <div className="date-container">
        <h2>{label}</h2>
        <h3>{format(date, FORMAT_STRING)}</h3>
      </div>
      <style jsx>{`
        .date-section {
          position: absolute;
          top: ${secondsFromStart / (6 * 60)}px;
          left: 50%;
          transform: translateX(-0.5em);
          width: max-content;
          font-family: "Terminal Grotesque";
          text-align: left;
          text-transform: uppercase;
          background-color: white;
        }

        .date-container {
          position: relative;
        }

        h2 {
          font-size: 24px;
          margin: 0;
        }
        h2:before {
          content: "— ";
        }

        h3 {
          font-size: 16px;
          margin: 0;
          position: absolute;
          width: max-content;
          padding-left: 1.5em;
        }

        @media (max-width: 500px) {
          .date-section {
            transform: translateX(-50%);
            text-align: center;
          }

          h2:before {
            content: "";
          }

          h3 {
            padding-left: 0;
            width: auto;
            position: static;
          }
        }
      `}</style>
    </div>
  );
});

DateLine.displayName = "DateLine";

export default DateLine;
