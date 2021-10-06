import { useState } from "react";
import Image from "next/image";

import stages from "../data/stages";
import TraitsSection from "../components/TraitsSection";
import {
  getAfterlifeTrait,
  getEvolutionTrait,
  getLifecycleTrait,
} from "../utils/traits";

function SimulateStageSection({ stageIndex, metadata }) {
  const stage = stages[stageIndex];
  const afterlifeTrait = getAfterlifeTrait({ metadata });
  const evolutionTrait = getEvolutionTrait({ metadata });
  const lifecycleTrait = getLifecycleTrait({ metadata });

  if (!metadata || !stage) {
    return null;
  }

  const afterlifePlaceholderBackgroundColor = (() => {
    switch (afterlifeTrait?.value) {
      case 1:
        return "0000FF";
      case 2:
        return "000099";
      case 3:
        return "00FFFF";
      default:
        return "#CCCCCC";
    }
  })();
  const evolutionPlaceholderBackgroundColor = (() => {
    switch (evolutionTrait?.value) {
      case 1:
        return "FF0000";
      case 2:
        return "990000";
      case 3:
        return "FFFF00";
      default:
        return "CCCCCC";
    }
  })();

  return (
    <div className="stage-section">
      <Image
        src={
          afterlifeTrait
            ? `https://via.placeholder.com/500/${afterlifePlaceholderBackgroundColor}/FFFFFC?text=L${lifecycleTrait.value}+AL${afterlifeTrait.value}`
            : evolutionTrait
            ? `https://via.placeholder.com/500/${evolutionPlaceholderBackgroundColor}/FFFFFFC?text=L${lifecycleTrait.value}+EVO${evolutionTrait.value}`
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

export default SimulateStageSection;
