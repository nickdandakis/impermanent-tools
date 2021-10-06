function ColumnLayout({ main, side }) {
  return (
    <div className="two-up">
      <div className="column side">{side}</div>
      <div className="column main">{main}</div>
      <style jsx>{`
        .two-up {
          flex: 1;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: stretch;
          max-width: 1440px;
          margin: 0 auto;
        }

        .two-up > .column {
          flex: 1 1 50%;
          min-width: 400px;
        }

        .column.side {
          display: flex;
          flex-flow: column;
        }

        .column.main {
          text-align: left;
          padding: 0 20px;
        }

        @media (max-width: 500px) {
          .column.main {
            min-width: 100%;
            padding: 0;
          }

          .two-up > .column {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ColumnLayout;
