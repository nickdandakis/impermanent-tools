import { useState } from "react";
import Image from "next/image";

import stages from "../data/stages";
import TraitsSection from "../components/TraitsSection";
import {
  getAfterlifeTrait,
  getEvolutionTrait,
  getLifecycleTrait,
} from "../utils/traits";

function DecisionsStageSection({ stageIndex, metadata }) {
  const stage = stages[stageIndex];
  const afterlifeTrait = getAfterlifeTrait({ metadata });
  const evolutionTrait = getEvolutionTrait({ metadata });
  const lifecycleTrait = getLifecycleTrait({ metadata });

  if (!metadata || !stage) {
    return null;
  }

  return (
    <div className="stage-section">
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
      <style jsx>{`
        header {
          text-align: left;
        }

        .stage-section {
          max-width: 500px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default DecisionsStageSection;
