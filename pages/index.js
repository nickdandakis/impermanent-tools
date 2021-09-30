import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactCompareImage from 'react-compare-image';

import metadata from '../data/metadata.json';
import useDebouncedState from '../hooks/useDebouncedState';
import getRandomColor from '../utils/getRandomColor';
import getRandomInt from '../utils/getRandomInt';

function IndexPage() {
  const router = useRouter();
  const [activeID, setActiveID] = useState('');
  const debouncedActiveID = useDebouncedState(activeID, 333);

  useEffect(() => {
    const [, initialActiveID] = router?.asPath?.match(/id=(\d+)/) || [];
    setActiveID(initialActiveID || '');
  }, []);

  useEffect(() => {
    router.replace(`?id=${activeID}`, null, {
      shallow: true,
    });
  }, [activeID]);

  const castedID = Number(debouncedActiveID);
  const isValidID = (!isNaN(castedID) && (castedID < 4444));
  const activeMetadata = isValidID ? (metadata[castedID]) : null;
  const hasPunkID = !!activeMetadata?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase() === 'punk id');

  const randomDegrees = getRandomInt(0, 360);
  const randomColorA = getRandomColor();
  const randomColorB = getRandomColor();

  return (
    <div className="page">
      <a href="https://impermanent.digital/" className="logo-wrapper">
        <Image src="/images/impermanent-logo.png" width="219" height="49" />
      </a>
      <input
        placeholder="ID"
        className="id-input"
        type="text"
        maxLength="4"
        value={activeID}
        onChange={event => {
          const updatedID = event.target.value || '';
          setActiveID(updatedID);
        }}
      />
      {isValidID && (
        <div className="compare">
          {hasPunkID && (
            <ReactCompareImage
              leftImage={activeMetadata.image}
              rightImage={`/images/punk-${castedID}.png`}
              rightImageCss={{
                imageRendering: 'auto',
                imageRendering: 'crisp-edges',
              }}
              skeleton={
                <div className="skeleton" />
              }
            />
          )}
          {!hasPunkID && (
            <Image
              src={activeMetadata.image}
              width={500}
              height={500}
            />
          )}
        </div>
      )}
      {isValidID && !hasPunkID && (
        <h4>*no punk available</h4>
      )}
      <style jsx>{`
        .page {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
        }

        .logo-wrapper{
          display: block;
          width: 100%;
          max-width: 200px;
          margin: 40px auto;
        }

        .id-input {
          font-size: 48px;
          width: 100%;
          text-align: center;
          margin-bottom: 40px;
        }

        .compare {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
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

export default IndexPage;
