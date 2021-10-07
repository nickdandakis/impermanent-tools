import { ButtonNext } from "pure-react-carousel";

export const HOLD_ACTION = "HOLD_ACTION";
export const BURN_ACTION = "BURN_ACTION";
export const EVOLVE_ACTION = "EVOLVE_ACTION";
export const SELL_ACTION = "SELL_ACTION";

function SimulateActions({
  stage,
  metadata,
  action,
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
      onMetadataUpdate({
        stageIndex: stage.index,
        updatedMetadata,
        action: HOLD_ACTION,
      });
    }
  };

  const handleBurn = () => {
    const updatedMetadata = stage.onBurn({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({
        stageIndex: stage.index,
        updatedMetadata,
        action: BURN_ACTION,
      });
    }
  };

  const handleEvolve = () => {
    const updatedMetadata = stage.onEvolve({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({
        stageIndex: stage.index,
        updatedMetadata,
        action: EVOLVE_ACTION,
      });
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
    <>
      <div className="actions">
        <button
          className="first"
          disabled={!stage.canHold({ metadata }) || isStageDisabled}
          onClick={handleHold}
        >
          {action === HOLD_ACTION && "✅"} Hold ✊
        </button>
        <button
          disabled={!stage.canBurn({ metadata }) || isStageDisabled}
          onClick={handleBurn}
        >
          {action === BURN_ACTION && "✅"} Burn ️🔥
        </button>
        <button
          disabled={!stage.canEvolve({ metadata }) || isStageDisabled}
          onClick={handleEvolve}
        >
          {action === EVOLVE_ACTION && "✅"} Evolve 🧬
        </button>
        <button
          className="last"
          disabled={!stage.canSell({ metadata }) || isStageDisabled}
          onClick={handleSell}
        >
          {action === SELL_ACTION && "✅"} Sell 💸
        </button>
      </div>
      <style jsx>{`
        .first {
          padding-left: 0;
        }

        .last {
          padding-right: 0;
        }

        .actions {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          margin: 0 auto;
        }

        @media (max-width: 500px) {
          button {
            width: 50%;
            padding: 20px 0;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

export default SimulateActions;
