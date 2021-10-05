import { useState } from "react";
import Image from "next/image";

import stages from "../data/stages";
import TraitsSection from "../components/TraitsSection";
import DecisionsActions from "../components/DecisionsActions";
import {
  getAfterlifeTrait,
  getEvolutionTrait,
  getLifecycleTrait,
} from "../utils/traits";

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
  const afterlifeTrait = getAfterlifeTrait({ metadata });
  const evolutionTrait = getEvolutionTrait({ metadata });
  const lifecycleTrait = getLifecycleTrait({ metadata });

  if (!metadata || !stage) {
    return null;
  }

  const isStageDisabled = activeStageIndex > stageIndex || hasSold;

  return (
    <div className="stage-section">
      <h3>{stage.heading}</h3>
      <p>{stage?.body({ metadata })}</p>
      <Image
        src={
          afterlifeTrait
            ? `https://via.placeholder.com/500/0000FF/FFFFFC?text=L${lifecycleTrait.value}+AL${afterlifeTrait.value} placeholder`
            : evolutionTrait
            ? `https://via.placeholder.com/500/FF0000/FFFFFFC?text=L${lifecycleTrait.value}+EVO${evolutionTrait.value} placeholder`
            : metadata.image
        }
        width={500}
        height={500}
      />
      <TraitsSection metadata={metadata} />
      <DecisionsActions
        stage={stage}
        isStageDisabled={isStageDisabled}
        metadata={metadata}
        onNextStage={onNextStage}
        onMetadataUpdate={onMetadataUpdate}
        onSell={onSell}
      />
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
