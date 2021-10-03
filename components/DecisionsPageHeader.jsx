function DecisionsPageHeader() {
  return (
    <header>
      <h1>Decisions, decisions</h1>
      <h2>Run through your decisions one step at a time, completely hypothetically</h2>
      <p>
        Reveal was YYYY/MM/DD or COUNTDOWN ago.<br />
        We are currently in "ACTIVE_STAGE".<br />
        The next stage "NEXT_STAGE" starts at YYYY/MM/DD or COUNTDOWN.
      </p>
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
