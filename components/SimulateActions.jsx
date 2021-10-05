import { ButtonNext } from "pure-react-carousel";

function SimulateActions({
  stage,
  metadata,
  isStageDisabled,
  isPreviousDisabled,
  isNextDisabled,
  onNextStage,
  onPreviousStage,
  onMetadataUpdate,
  onSell,
}) {
  const handleHold = () => {
    const updatedMetadata = stage.onHold({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({ stageIndex: stage.index, updatedMetadata });
    }
  };

  const handleBurn = () => {
    const updatedMetadata = stage.onBurn({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({ stageIndex: stage.index, updatedMetadata });
    }
  };

  const handleEvolve = () => {
    const updatedMetadata = stage.onEvolve({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({ stageIndex: stage.index, updatedMetadata });
    }
  };

  const handleSell = () => {
    if (confirm("Would you really sell here?")) {
      if (confirm("What, and just give up on the art?")) {
        if (confirm("You really don't want to build generational wealth?")) {
          if (confirm("ngmi?")) {
            onSell();
          }
        }
      }
    }
  };

  return (
    <div className="actions">
      <button
        className="first"
        disabled={!stage.canHold({ metadata }) || isStageDisabled}
        onClick={handleHold}
      >
        Hold ✊
      </button>
      <button
        disabled={!stage.canBurn({ metadata }) || isStageDisabled}
        onClick={handleBurn}
      >
        Burn ️🔥
      </button>
      <button
        disabled={!stage.canEvolve({ metadata }) || isStageDisabled}
        onClick={handleEvolve}
      >
        Evolve 🧬
      </button>
      <button
        className="last"
        disabled={!stage.canSell({ metadata }) || isStageDisabled}
        onClick={handleSell}
      >
        Sell 💸
      </button>
      <style jsx>{`
        .first {
          padding-left: 0;
        }

        .last {
          padding-right: 0;
        }

        .actions {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          max-width: 400px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default SimulateActions;
