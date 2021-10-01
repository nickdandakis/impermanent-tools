import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import ReactCompareImage from '../components/ReactCompareImage.tsx';
import DiscordLogo from'../components/DiscordLogo';
import TwitterLogo from'../components/TwitterLogo';
import GithubLogo from'../components/GithubLogo';
import OpenSeaLogo from'../components/OpenSeaLogo';
import metadata from '../data/metadata.json';
import metadataMeta from '../data/metadata-meta.json';
import punkMap from '../data/punkMap.json';
import getRandomColor from '../utils/getRandomColor';
import getRandomInt from '../utils/getRandomInt';
import useDebouncedCallback from '../hooks/useDebouncedCallback';

const IMPERMANENT_DIGITAL_CONTRACT_ID = '0xa66f3bd98b4741bad68bcd7511163c6f855d2129';
const CRYPTO_PUNKS_CONTRACT_ID = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
const OPENSEA_IMPERMANENT_DIGITAL_LIFECYCLE_FILTER_URL = 'https://opensea.io/collection/impermanent-digital?search[stringTraits][0][name]=Lifecycle%20Trait&search[stringTraits][0][values][0]=';
const OPENSEA_IMPERMANENT_DIGITAL_WAVELENGTH_FILTER_URL = 'https://opensea.io/collection/impermanent-digital?search[stringTraits][0][name]=Wavelength&search[stringTraits][0][values][0]=';
const OPENSEA_IMPERMANENT_DIGITAL_SIGNATURE_FILTER_URL = 'https://opensea.io/collection/impermanent-digital?search[stringTraits][0][name]=Signature Edition&search[stringTraits][0][values][0]=1%2F1';

function IndexPage() {
  const router = useRouter();
  const {
    id: activeID,
    isReversed: unparsedIsReversed,
  } = router.query;
  const isReversed = (unparsedIsReversed === 'true');

  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(activeID);
  }, [router]);

  const castedID = Number(activeID);
  const hasID = activeID?.length !== 0;
  const isValidID = (
    isReversed
    ? !isNaN(castedID) && (castedID < 10000)
    : !isNaN(castedID) && (castedID < 4444)
  );

  const activeMetadata = (
    isValidID
    ? isReversed
      ? (metadata[Number(punkMap[activeID])])
      : (metadata[castedID])
    : null
  );
  const activeMetadataPunk = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('punk id'));

  const impermanentID = (isReversed ? punkMap[activeID] : activeID);
  const punkID = (isReversed ? activeID : activeMetadataPunk?.value);

  const activeMetadataWavelength = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('wavelength'));
  const activeMetadataLifecycle = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('lifecycle trait'));
  const activeMetadataSignatureEdition = activeMetadata
    ?.attributes
    ?.find(({ trait_type }) => trait_type.toLowerCase().includes('signature edition'));

  const randomDegrees = useMemo(() => getRandomInt(0, 360), [activeID]);
  const randomColorA = useMemo(() => getRandomColor(), [activeID]);
  const randomColorB = useMemo(() => getRandomColor(), [activeID]);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const updateQueryID = useDebouncedCallback((updatedID) => {
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        id: updatedID,
      }
    });
  }, 333, [router]);

  const handleInputChange = useCallback((event) => {
    const updatedID = event.target.value || '';

    updateQueryID(updatedID);
    setInputValue(updatedID);
  }, [router]);

  const handleReverse = (event) => {
    event.preventDefault();

    const updatedIsReversed = !(router.query.isReversed === 'true');

    const updatedID = (
      updatedIsReversed
      ? activeMetadataPunk?.value
      : punkMap[activeMetadataPunk?.value]
    );

    router.push({
      pathname: '/',
      query: {
        ...router.query,
        isReversed: updatedIsReversed,
        id: updatedID,
      }
    });

    setInputValue(updatedID);
  }

  return (
    <div className="page">
      <a href="https://impermanent.digital/" className="logo-wrapper">
        <Image src="/images/impermanent-logo.png" width="219" height="49" />
      </a>
      
      <a href="#reverse" onClick={handleReverse} className="reverse-button">
        🔄
      </a>
      <main>
        <h1>
          Compare&nbsp;
          {isReversed ? 'Impermanent Digital' : 'CryptoPunk'}
          {`\n`}
          with&nbsp;
          {isReversed ? 'CryptoPunk' : 'Impermanent Digital'}
        </h1>
        <input
          ref={inputRef}
          placeholder="#"
          className="id-input"
          type="text"
          maxLength="5"
          value={inputValue}
          onChange={handleInputChange}
        />
        {isValidID && (
          <>
            <div className="compare">
              <div className="compare-container">
                <div className="skeleton" />
                {activeMetadataPunk && (
                  <ReactCompareImage
                    leftImage={`/images/punk-${activeMetadataPunk.value}.png`}
                    leftImageClassName="punk-image"
                    rightImage={activeMetadata.image}
                    rightImageClassName="impermanent-image"
                    skeleton={
                      <div className="skeleton" />
                    }
                  />
                )}
                {!activeMetadataPunk && activeMetadata && (
                  <Image
                    src={activeMetadata.image}
                    width={500}
                    height={500}
                  />
                )}
              </div>
            </div>
            <footer className="metadata-footer">
              <div className="column">
                {activeMetadataPunk ? (
                  <a
                    href={`https://opensea.io/assets/${CRYPTO_PUNKS_CONTRACT_ID}/${activeMetadataPunk.value}`}
                    target="_blank"
                  >
                    Punk #{activeMetadataPunk.value}
                  </a>
                ) : hasID && (
                  <span>
                    No&nbsp;
                    {isReversed ? 'Impermanent Digital' : 'CryptoPunk'}
                    &nbsp;available
                  </span>
                )}
              </div>
              <div className="column">
                {isValidID && hasID && impermanentID && (
                  <a
                    href={`https://opensea.io/assets/${IMPERMANENT_DIGITAL_CONTRACT_ID}/${impermanentID}`}
                    target="_blank"
                  >
                    ID #{impermanentID}
                  </a>
                )}
                {activeMetadataWavelength && (
                  <a
                    href={`${OPENSEA_IMPERMANENT_DIGITAL_WAVELENGTH_FILTER_URL}${activeMetadataWavelength.value}`}
                    target="_blank"
                  >
                    {activeMetadataWavelength.value}
                  </a>
                )}
                {activeMetadataLifecycle && (
                  <a
                    href={`${OPENSEA_IMPERMANENT_DIGITAL_WAVELENGTH_FILTER_URL}${activeMetadataLifecycle.value}`}
                    target="_blank"
                  >
                    L{activeMetadataLifecycle.value}
                  </a>
                )}
                {activeMetadataSignatureEdition && (
                  <a
                    href={OPENSEA_IMPERMANENT_DIGITAL_SIGNATURE_FILTER_URL}
                    target="_blank"
                  >
                    Signature Edition: {activeMetadataSignatureEdition.value}
                  </a>
                )}
              </div>
            </footer>
          </>
        )}
      </main>
      <footer className="page-footer">
        <div className="left">
          <span className="last-updated">
            Last updated: {new Date(metadataMeta.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="right">
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
        </div>
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
          max-width: 500px;
        }

        .reverse-button {
          font-size: 36px;
          transition: transform 0.1s ease-in-out;
        }
        .reverse-button:hover {
          transform: translateY(3px);
        }

        h1 {
          font-size: 24px;
          white-space: pre-line;
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

        .column + .column {
          text-align: right;
        }

        .column > * {
          padding-bottom: 10px;
        }

        .page-footer {
          box-sizing: border-box;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 10px 20px;
        }

        .right {
          flex: 1 1 60%;
          display: flex;
          flex-flow: row wrap;
          width: 100%;
          text-align: right;
          justify-content: flex-end;
          align-items: center;
        }

        .right > * {
          padding: 10px 20px;
        }

        .left {
          flex: 1 1 40%;
          text-align: left;
          font-size: 14px;
        }

        @media (max-width: 500px) {
          .metadata-footer {
            font-size: 14px;
          }

          .left {
            width: 100%;
            flex-basis: 100%;
            text-align: center;
            justify-content: center;
            order: 1;
            padding-top: 10px;
            padding-bottom: 10px;
          }

          .right {
            width: 100%;
            flex-basis: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
      <style jsx global>{`
        .punk-image {
          image-rendering: auto;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}

export default IndexPage;
