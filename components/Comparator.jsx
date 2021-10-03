import { useMemo } from 'react';
import Image from 'next/image';

import ReactCompareImage from '../components/ReactCompareImage.tsx';
import getRandomColor from '../utils/getRandomColor';
import getRandomInt from '../utils/getRandomInt';
import { getPunkTrait } from '../utils/traits';

function Comparator({ metadata }) {
  const traitPunk = getPunkTrait({ metadata });

  const randomDegrees = useMemo(() => getRandomInt(0, 360), [metadata?.id]);
  const randomColorA = useMemo(() => getRandomColor(), [metadata?.id]);
  const randomColorB = useMemo(() => getRandomColor(), [metadata?.id]);

  return (
    <div className="compare">
      <div className="compare-container">
        <div className="skeleton" />
        {traitPunk && (
          <ReactCompareImage
            leftImage={`/images/punk-${traitPunk.value}.png`}
            leftImageClassName="punk-image"
            rightImage={metadata.image}
            rightImageClassName="impermanent-image"
            skeleton={
              <div className="skeleton" />
            }
          />
        )}
        {!traitPunk && metadata && (
          <Image
            src={metadata.image}
            width={500}
            height={500}
          />
        )}
      </div>
      <style jsx>{`
        .compare {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 100%;
          margin: 0 auto;
        }

        .compare-container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .skeleton {
          width: 100%;
          height: 0;
          padding-top: 100%;
          position: absolute;
          overflow: auto!important;
          top: 0;
          left: 0;
          background: linear-gradient(${randomDegrees}deg, ${randomColorA}, ${randomColorB});
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

export default Comparator;
