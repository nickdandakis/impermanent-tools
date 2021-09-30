import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactCompareImage from 'react-compare-image';

import DiscordLogo from'../components/DiscordLogo';
import TwitterLogo from'../components/TwitterLogo';
import GithubLogo from'../components/GithubLogo';
import OpenSeaLogo from'../components/OpenSeaLogo';
import metadata from '../data/metadata.json';
import metadataMeta from '../data/metadata-meta.json';
import useDebouncedState from '../hooks/useDebouncedState';
import getRandomColor from '../utils/getRandomColor';
import getRandomInt from '../utils/getRandomInt';

const IMPERMANENT_DIGITAL_CONTRACT_ID = '0xa66f3bd98b4741bad68bcd7511163c6f855d2129';
const CRYPTO_PUNKS_CONTRACT_ID = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';

function IndexPage() {
  const router = useRouter();
  const [activeID, setActiveID] = useState('');
  const debouncedActiveID = useDebouncedState(activeID, 333);
  const inputRef = useRef();

  useEffect(() => {
    const [, initialActiveID] = router?.asPath?.match(/id=(\d+)/) || [];
    setActiveID(initialActiveID || '');
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    router.replace(`?id=${activeID}`, null, {
      shallow: true,
    });
  }, [activeID]);

  const castedID = Number(debouncedActiveID);
  const hasID = debouncedActiveID.length !== 0;
  const isValidID = (!isNaN(castedID) && (castedID < 4444));
  const activeMetadata = isValidID ? (metadata[castedID]) : null;
  const hasPunkID = !!activeMetadata?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('punk id'));
  const activeMetadataWavelength = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('wavelength'));
  const activeMetadataLifecycle = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('lifecycle trait'));
  const activeMetadataSignatureEdition = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('signature edition'));

  const randomDegrees = getRandomInt(0, 360);
  const randomColorA = getRandomColor();
  const randomColorB = getRandomColor();

  return (
    <div className="page">
      <a href="https://impermanent.digital/" className="logo-wrapper">
        <Image src="/images/impermanent-logo.png" width="219" height="49" />
      </a>
      <main>
        <h1>Compare Impermanent Digital with CryptoPunk</h1>
        <input
          ref={inputRef}
          placeholder="#"
          className="id-input"
          type="text"
          maxLength="5"
          value={`#${activeID}`}
          onChange={event => {
            const updatedID = event.target.value || '';
            setActiveID(updatedID.replace(/#/g, ''));
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
            <footer className="metadata-footer">
              <div className="column">
                <a
                  href={`https://opensea.io/assets/${IMPERMANENT_DIGITAL_CONTRACT_ID}/${debouncedActiveID}`}
                  target="_blank"
                >
                  ID #{debouncedActiveID} @OpenSea
                </a>
                {hasPunkID && (
                  <a
                    href={`https://opensea.io/assets/${CRYPTO_PUNKS_CONTRACT_ID}/${debouncedActiveID}`}
                    target="_blank"
                  >
                    Punk #{debouncedActiveID} @OpenSea
                  </a>
                )}
              </div>
              <div className="column">
                {activeMetadataWavelength && (
                  <span>Wavelength: {activeMetadataWavelength.value}</span>
                )}
                {activeMetadataLifecycle && (
                  <span>Lifecycle: {activeMetadataLifecycle.value}</span>
                )}
                {activeMetadataSignatureEdition && (
                  <span>Signature Edition: {activeMetadataSignatureEdition.value}</span>
                )}
              </div>
            </footer>
          </div>
        )}
        {isValidID && !hasPunkID && hasID && (
          <h4>*no punk available</h4>
        )}
      </main>
      <footer className="page-footer">
        <a
          href="https://opensea.io/collection/impermanent-digital"
          target="_blank"
        >
          <OpenSeaLogo />
        </a>
        <a
          href="http://twitter.com/impermanentID"
          target="_blank"
        >
          <TwitterLogo />
        </a>
        <a
          href="https://discord.gg/p4N4z9Mydk"
          target="_blank"
        >
          <DiscordLogo />
        </a>
        <a
          href="https://github.com/nickdandakis/impermanent-digital-comparison/"
          target="_blank"
        >
          <GithubLogo />
        </a>
        <span className="separator">
          |
        </span>
        <span className="last-updated">
          Last updated: {new Date(metadataMeta.updatedAt).toLocaleDateString()}
        </span>
      </footer>
      <style jsx>{`
        .page {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
          justify-content: space-between;
          min-height: 100vh;
        }

        .logo-wrapper{
          display: block;
          width: 100%;
          max-width: 200px;
          margin: 20px auto;
        }

        main {
          flex: 1;
          padding: 0 20px;
        }

        .id-input {
          font-size: 48px;
          width: 100%;
          text-align: center;
          margin-bottom: 30px;
          color: gray;
        }

        .id-input:focus {
          color: black;
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

        .metadata-footer {
          display: flex;
          flex-flow: row wrap;
          text-align: left;
          padding-top: 20px;
        }

        .metadata-footer > * {
          flex: 1 1 50%;
          max-width: 50%;
        }

        .column {
          display: flex;
          flex-flow: column;
          justify-content: flex-between;
        }

        .column > * {
          padding-bottom: 10px;
        }

        .page-footer {
          display: flex;
          flex-flow: row wrap;
          width: 100%;
          text-align: right;
          justify-content: flex-end;
          align-items: center;
          padding: 20px 0;
        }

        .page-footer > * {
          padding: 10px 20px;
        }

        @media (max-width: 500px) {
          .page-footer {
            text-align: center;
            justify-content: center;
          }

          .separator {
            display: none;
          }

          .last-updated {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default IndexPage;
