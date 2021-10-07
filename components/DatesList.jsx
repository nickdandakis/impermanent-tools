import { useEffect, useState } from "react";
import {
  format,
  isAfter,
  isBefore,
  isEqual,
  intervalToDuration,
} from "date-fns";

const FORMAT_STRING = "yyyy-MM-dd HH:mm:ss (xxx)";

const now = new Date(Date.now());

const formatDuration = ({
  years,
  months,
  weeks,
  days,
  hours,
  minutes,
  seconds,
}) =>
  [
    years && `${years}y`,
    months && `${months}mo`,
    weeks && `${weeks}w`,
    days && `${days}d`,
    hours && `${String(hours).padStart(2, "0")}hr${hours > 1 ? "s" : ""}`,
    minutes && `${String(minutes).padStart(2, "0")}mins`,
    seconds && `${String(seconds).padStart(2, "0")}s`,
  ]
    .filter(Boolean)
    .join(", ");

const getCountdown = (date) =>
  isAfter(now, date)
    ? intervalToDuration({
        start: new Date(Date.now()),
        end: date,
      })
    : intervalToDuration({
        start: date,
        end: new Date(Date.now()),
      });

function DatesList({
  label,
  startsAt,
  endsAt,
  initialIsToggledFormat = false,
}) {
  const [isToggledFormat, setIsToggledFormat] = useState(
    initialIsToggledFormat
  );
  const [countdownStartsAt, setCountdownStartsAt] = useState(
    getCountdown(startsAt || now)
  );
  const [countdownEndsAt, setCountdownEndsAt] = useState(
    getCountdown(endsAt || now)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (startsAt) {
        setCountdownStartsAt(getCountdown(startsAt));
      }
      if (endsAt) {
        setCountdownEndsAt(getCountdown(endsAt));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startsAt, endsAt, setCountdownStartsAt, setCountdownEndsAt]);

  const handleToggle = (event) => {
    event.preventDefault();

    setIsToggledFormat((previousIsToggledFormat) => !previousIsToggledFormat);
  };

  if (!startsAt || !endsAt) return null;

  return (
    <dl>
      <dt>{label}</dt>
      {isEqual(startsAt, endsAt) ? (
        <dd>
          <a href="#toggle" className="occured-at" onClick={handleToggle}>
            {isToggledFormat
              ? isAfter(new Date(Date.now()), startsAt)
                ? "-"
                : "+"
              : null}
            {isToggledFormat
              ? formatDuration(countdownStartsAt, { delimiter: ", " })
              : format(startsAt, FORMAT_STRING)}
            {isToggledFormat ? " from now" : null}
          </a>
        </dd>
      ) : (
        <dd>
          {startsAt && (
            <a href="#toggle" className="starts-at" onClick={handleToggle}>
              {isToggledFormat
                ? isAfter(new Date(Date.now()), startsAt)
                  ? "-"
                  : "+"
                : null}
              {isToggledFormat
                ? formatDuration(countdownStartsAt, { delimiter: ", " })
                : format(startsAt, FORMAT_STRING)}
              {isToggledFormat ? " from now" : null}
            </a>
          )}
          {endsAt && (
            <a href="#toggle" className="ends-at" onClick={handleToggle}>
              {isToggledFormat
                ? isAfter(new Date(Date.now()), endsAt)
                  ? "-"
                  : "+"
                : null}
              {isToggledFormat
                ? formatDuration(countdownEndsAt, { delimiter: ", " })
                : format(endsAt, FORMAT_STRING)}
              {isToggledFormat ? " from now" : null}
            </a>
          )}
        </dd>
      )}
      <style jsx>{`
        dl {
          margin: 0;
        }

        dt {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
          margin-bottom: 5px;
          letter-spacing: 0.05em;
          font-family: "Terminal Grotesque";
        }

        dd {
          margin-left: 0;
          font-size: 14px;
        }

        .occured-at {
          font-family: monospace;
        }

        .starts-at,
        .ends-at {
          display: block;
          margin-bottom: 2px;
          font-family: monospace;
        }
      `}</style>
    </dl>
  );
}

export default DatesList;
