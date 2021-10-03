import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import PageLayout from '../components/PageLayout';
import TraitsSection from '../components/TraitsSection';
import Comparator from '../components/Comparator';
import { getPunkTrait } from '../utils/traits';

import ReactCompareImage from '../components/ReactCompareImage.tsx';
import allMetadata from '../data/metadata.json';
import punkMap from '../data/punkMap.json';
import useDebouncedCallback from '../hooks/useDebouncedCallback';

function ComparePage() {
  const router = useRouter();
  const {
    id: activeID,
    isReversed: unparsedIsReversed,
  } = router.query;
  const isReversed = (unparsedIsReversed === 'true');

  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const castedID = Number(activeID);
  const hasID = activeID?.length !== 0;
  const isValidID = (
    isReversed
    ? !isNaN(castedID) && (castedID < 10000)
    : !isNaN(castedID) && (castedID < 4444)
  );

  const metadata = (
    isValidID
    ? isReversed
      ? (allMetadata[Number(punkMap[activeID])])
      : (allMetadata[castedID])
    : null
  );
  const attributePunk = getPunkTrait({ metadata });

  useEffect(() => {
    setInputValue(activeID);
  }, [router]);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const updateQueryID = useDebouncedCallback((updatedID) => {
    router.replace({
      pathname: '/compare',
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
      ? attributePunk?.value
      : punkMap[attributePunk?.value]
    );

    router.replace({
      pathname: '/compare',
      query: {
        ...router.query,
        isReversed: updatedIsReversed,
        id: updatedID,
      }
    });

    setInputValue(updatedID);
  }

  return (
    <div className="compare-page">
      <a
        href="#reverse"
        onClick={handleReverse}
        className="reverse-button"
        key="reverse-button"
      >
        🔄
        Reverse search
      </a>
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
          <Comparator metadata={metadata} />
          <TraitsSection metadata={metadata} isReversed={isReversed} />
        </>
      )}
      <style jsx>{`
        .compare-page {
          max-width: 500px;
          margin: 0 auto;
        }

        .reverse-button {
          font-size: 16px;
          transition: transform 0.1s ease-in-out;
        }
        .reverse-button:hover {
          transform: translateY(2px);
        }

        h1 {
          font-size: 24px;
          white-space: pre-line;
        }

        .id-input {
          font-size: 48px;
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          color: gray;
        }
        .id-input:focus {
          color: black;
        }

        @media (max-width: 500px) {
          .reverse-button {
            font-size: 14px;
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

ComparePage.getLayout = (page) => {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  );
};

export default ComparePage;
