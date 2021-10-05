import { useState } from "react";
import Image from "next/image";

import stages from "../data/stages";
import TraitsSection from "../components/TraitsSection";
import { getAfterlifeTrait, getEvolutionTrait } from "../utils/traits";

function DecisionsStageSection({
  stageIndex,
  metadata,
  activeStageIndex,
  hasSold,
  onNextStage,
  onMetadataUpdate,
  onSell,
}) {
  const stage = stages[stageIndex];
  const [overloadedMetadata, setOverloadedMetadata] = useState(metadata);
  const afterlifeTrait = getAfterlifeTrait({ metadata });
  const evolutionTrait = getEvolutionTrait({ metadata });

  if (!metadata || !stage) {
    return null;
  }

  const isStageDisabled = activeStageIndex > stageIndex || hasSold;

  const handleHold = () => {
    const updatedMetadata = stage.onHold({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({ stageIndex, updatedMetadata });
    }
  };

  const handleBurn = () => {
    const updatedMetadata = stage.onBurn({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({ stageIndex, updatedMetadata });
    }
  };

  const handleEvolve = () => {
    const updatedMetadata = stage.onEvolve({ metadata });
    onNextStage();
    if (updatedMetadata) {
      onMetadataUpdate({ stageIndex, updatedMetadata });
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
    <div className="stage-section">
      <h3>{stage.label}</h3>
      <Image
        src={
          afterlifeTrait || evolutionTrait
            ? "https://via.placeholder.com/500"
            : metadata.image
        }
        width={500}
        height={500}
      />
      <TraitsSection metadata={overloadedMetadata} />
      <div className="actions">
        <button
          disabled={!stage.canHold({ metadata }) || isStageDisabled}
          onClick={handleHold}
        >
          Hold
        </button>
        <button
          disabled={!stage.canBurn({ metadata }) || isStageDisabled}
          onClick={handleBurn}
        >
          Burn
        </button>
        <button
          disabled={!stage.canEvolve({ metadata }) || isStageDisabled}
          onClick={handleEvolve}
        >
          Evolve
        </button>
        <button
          disabled={!stage.canSell({ metadata }) || isStageDisabled}
          onClick={handleSell}
        >
          Sell
        </button>
      </div>
      <style jsx>{`
        .stage-section {
          max-width: 500px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default DecisionsStageSection;
