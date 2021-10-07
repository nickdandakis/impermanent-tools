import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { SubHeading } from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import ColumnLayout from "../components/ColumnLayout";
import TraitsSection from "../components/TraitsSection";
import Comparator from "../components/Comparator";
import { getPunkTrait } from "../utils/traits";
import IDInput from "../components/IDInput";
import getRandomInt from "../utils/getRandomInt";

import ReactCompareImage from "../components/ReactCompareImage.tsx";
import allMetadata from "../data/metadata.json";
import punkMap from "../data/punkMap.json";
import useDebouncedCallback from "../hooks/useDebouncedCallback";

function ComparePage() {
  const router = useRouter();
  const { id: activeID, isReversed: unparsedIsReversed } = router.query;
  const isReversed = unparsedIsReversed === "true";

  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const castedID = Number(activeID);
  const hasID = activeID?.length !== 0;
  const isValidID = isReversed
    ? !isNaN(castedID) && castedID < 10000
    : !isNaN(castedID) && castedID < 4444;

  const metadata = isValidID
    ? isReversed
      ? allMetadata[Number(punkMap[activeID])]
      : allMetadata[castedID]
    : null;
  const attributePunk = getPunkTrait({ metadata });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!activeID) {
      router.replace({
        pathname: "/compare",
        query: {
          ...router.query,
          id: getRandomInt(0, 4444),
        },
      });
    } else {
      setInputValue(activeID);
    }
  }, [router]);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const updateQueryID = useDebouncedCallback(
    (updatedID) => {
      router.replace({
        pathname: "/compare",
        query: {
          ...router.query,
          id: updatedID,
        },
      });
    },
    333,
    [router]
  );

  const handleInputChange = useCallback(
    (event) => {
      const updatedID = event.target.value || "";

      updateQueryID(updatedID);
      setInputValue(updatedID);
    },
    [router]
  );

  const handleReverse = (event) => {
    event.preventDefault();

    const updatedIsReversed = !(router.query.isReversed === "true");

    const updatedID = updatedIsReversed
      ? attributePunk?.value
      : punkMap[attributePunk?.value];

    router.replace({
      pathname: "/compare",
      query: {
        ...router.query,
        isReversed: updatedIsReversed,
        id: updatedID,
      },
    });

    setInputValue(updatedID);
  };

  return (
    <div className="compare-page">
      <ColumnLayout
        side={
          <>
            <Comparator metadata={metadata} />
            <TraitsSection metadata={metadata} isReversed={isReversed} />
          </>
        }
        main={
          <>
            <div className="input-wrapper">
              <IDInput
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                onClick={handleReverse}
                className="reverse-button"
                key="reverse-button"
              >
                🔄 Reverse search
              </button>
            </div>
            <h3>
              Comparing this&nbsp;
              {isReversed ? "CryptoPunk" : "Impermanent Digital"}
              &nbsp;against its&nbsp;
              {isReversed ? "Impermanent Digital" : "CryptoPunk"}
            </h3>
            <hr />
            <p>
              Following this current series of 4444 (Punks), IDs will roll out
              in 3 more series — each &apos;killing&apos; off an existing
              collection. Each will follow a similar model to the 4444 series.
              Each will have a lower supply than the previous — and access will
              be initially geared towards Afterlife holders.
            </p>
            <p>
              All lead up to the Auras project, a culmination of
              Glassface&apos;s skillset. More on Auras will be announced soon —
              it is a combination of many forms of media, and an evolution in AI
              art tech.
            </p>
          </>
        }
      />
      <style jsx>{`
        .compare-page {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          flex: 1;
          padding-top: 40px;
        }

        .reverse-button {
          font-size: 16px;
          transition: transform 0.1s ease-in-out;
        }
        .reverse-button:hover {
          transform: translateY(2px);
        }

        .input-wrapper {
          display: flex;
          flex-flow: row;
          margin-bottom: 20px;
        }

        .input-wrapper > button {
          flex: 0 0 auto;
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
    <PageLayout subHeading={<SubHeading heading="Comparison Tool" />}>
      {page}
    </PageLayout>
  );
};

export default ComparePage;
