import { useState } from "react";
import Image from "next/image";

import stages from "../data/stages";
import TraitsSection from "../components/TraitsSection";
import {
  getAfterlifeTrait,
  getEvolutionTrait,
  getLifecycleTrait,
} from "../utils/traits";
import classNames from "../utils/classNames";

function SimulateStageSection({ stageIndex, metadata }) {
  const stage = stages[stageIndex];
  const afterlifeTrait = getAfterlifeTrait({ metadata });
  const evolutionTrait = getEvolutionTrait({ metadata });
  const lifecycleTrait = getLifecycleTrait({ metadata });

  if (!metadata || !stage) {
    return null;
  }

  const hasPlaceholderImage = !!(afterlifeTrait || evolutionTrait);

  const label =
    hasPlaceholderImage &&
    [
      `LIFECYCLE ${lifecycleTrait.value}`,
      afterlifeTrait?.value && `AFTERLIFE ${afterlifeTrait.value}`,
      evolutionTrait?.value && `EVOLUTION ${evolutionTrait.value}`,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="stage-section">
      <div className="image-wrapper">
        <Image
          className={classNames(hasPlaceholderImage && "blurred")}
          src={metadata.image}
          width={500}
          height={500}
        />
        {hasPlaceholderImage && (
          <div className="overlay">
            <span className="label">{label}</span>
          </div>
        )}
      </div>
      <TraitsSection metadata={metadata} />
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate(0%, -50%);
          }
          50% {
            transform: translate(-100%, -50%);
          }
          50.001% {
            transform: translate(100%, -50%);
          }
          100% {
            transform: translate(0%, -50%);
          }
        }

        header {
          text-align: left;
        }

        .blurred {
          filter: blur(10px);
        }

        .image-wrapper {
          line-height: 0;
          position: relative;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
        }

        .label {
          font-weight: bold;
          font-family: "Terminal Grotesque";
          font-size: 48px;
          color: rgba(255, 255, 255, 0.8);
          user-select: none;
          pointer-events: none;
          animation: marquee 6s linear infinite;
          animation-play-state: running;
          width: max-content;
          position: absolute;
          top: 50%;
          left: 0;
        }

        .stage-section {
          max-width: 500px;
          margin: 0 auto;
        }
      `}</style>

      <style jsx global>{`
        .blurred {
          filter: blur(10px) saturate(${evolutionTrait?.value || 1})
            hue-rotate(${(afterlifeTrait?.value || 0) * 90}deg);
        }
      `}</style>
    </div>
  );
}

export default SimulateStageSection;
