import AnimatedSpinner from "../components/AnimatedSpinner";

export const StatisticCardRow = ({ children, suffix }) => {
  return (
    <div className="statistic-card-row">
      {children}
      {suffix && <span className="suffix">{suffix}</span>}
      <style jsx>{`
        .statistic-card-row {
          font-size: 48px;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .suffix {
          font-size: 0.3em;
          display: block;
        }
      `}</style>
    </div>
  );
};

function StatisticCard({ heading, children, isFetching, suffix }) {
  return (
    <div className="statistic-card">
      <h1>{heading}</h1>

      <div className="children-wrapper">
        {isFetching ? (
          <AnimatedSpinner />
        ) : (
          <>
            {children}
            {suffix && <span className="suffix">{suffix}</span>}
          </>
        )}
      </div>

      <style jsx>{`
        .statistic-card {
          border: solid 1px rgba(0, 0, 0, 0.125);
          border-radius: 30px;
          padding: 20px;
          text-align: left;
          box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-flow: column;
        }

        h1 {
          margin: 0;
          font-size: 22px;
          text-transform: uppercase;
        }

        .children-wrapper {
          font-size: 48px;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
          flex: 1;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }

        .suffix {
          font-size: 0.3em;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default StatisticCard;
