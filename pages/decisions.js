import { useState, useCallback, useEffect } from "react";

import stages from "../data/stages";
import PageLayout from "../components/PageLayout";
import DecisionsPageHeader from "../components/DecisionsPageHeader";
import IDInput from "../components/IDInput";
import allMetadata from "../data/metadata.json";
import DecisionsStageSection from "../components/DecisionsStageSection";
import DecisionsActions from "../components/DecisionsActions";
import classNames from "../utils/classNames";
import getRandomInt from "../utils/getRandomInt";

function DecisionsPage() {
  const [inputValue, setInputValue] = useState("");
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [answeredStageIndex, setAnsweredStageIndex] = useState(-1);
  const [metadataByStage, setMetadataByStage] = useState([]);
  const [hasSold, setHasSold] = useState(false);

  useEffect(() => {
    if (inputValue?.length === 0) {
      setInputValue(getRandomInt(0, 4444));
    }
  }, []);

  useEffect(() => {
    const castedID = Number(inputValue);
    const hasID = inputValue?.length !== 0;
    const isValidID = !isNaN(castedID) && castedID < 4444;
    const metadata = isValidID ? allMetadata[castedID] : null;

    if (metadata) {
      setMetadataByStage([metadata]);
      setHasSold(false);
      setActiveStageIndex(0);
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    const updatedID = event.target.value || "";

    setInputValue(updatedID);
    setActiveStageIndex(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="decisions-page">
      <div className="two-up">
        <div className="column side">
          <DecisionsPageHeader />
          <IDInput value={inputValue} onChange={handleInputChange} />
        </div>
        <div className="column main">
          <div className={classNames("container", hasSold && "has-sold")}>
            <div className="carousel">
              {activeStageIndex !== -1 &&
                stages.map((stage, stageIndex) => (
                  <div className="slide" key={stageIndex}>
                    <DecisionsStageSection
                      stageIndex={stageIndex}
                      activeStageIndex={activeStageIndex}
                      metadata={metadataByStage[stageIndex]}
                    />
                  </div>
                ))}
            </div>
          </div>
          {activeStageIndex > -1 && (
            <DecisionsActions
              stage={stages[activeStageIndex]}
              metadata={metadataByStage[activeStageIndex]}
              isStageDisabled={
                hasSold || answeredStageIndex >= activeStageIndex
              }
              isNextDisabled={
                activeStageIndex > stages.legnth - 1 ||
                answeredStageIndex < activeStageIndex
              }
              isPreviousDisabled={activeStageIndex <= 0}
              onPreviousStage={() =>
                setActiveStageIndex(
                  (previousActiveStageIndex) => previousActiveStageIndex - 1
                )
              }
              onNextStage={() =>
                setActiveStageIndex(
                  (previousActiveStageIndex) => previousActiveStageIndex + 1
                )
              }
              onMetadataUpdate={({ stageIndex, updatedMetadata }) => {
                if (stageIndex > answeredStageIndex) {
                  setAnsweredStageIndex(stageIndex);
                }
                setMetadataByStage([...metadataByStage, updatedMetadata]);
              }}
              onSell={() => setHasSold(true)}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .decisions-page {
          flex: 1;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }

        .two-up {
          flex: 1;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: stretch;
          max-width: 1440px;
          margin: 0 auto;
        }

        .two-up > .column {
          flex: 1 1 50%;
          min-width: 400px;
        }

        .column.side {
          display: flex;
          flex-flow: column;
          justify-content: center;
        }

        .column.main {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
        }

        .has-sold {
          opacity: 0.5;
          pointer-events: none;
        }

        .container {
          overflow: hidden;
          position: relative;
          min-width: 300px;
          width: 45vh;
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
        }

        .carousel {
          position: relative;
          width: ${stages.length * 100}%;
          transition: all 0.1s ease-in-out;
          transform: translateX(-${activeStageIndex * (100 / stages.length)}%);
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
        }

        .slide {
          width: ${100 / stages.length}%;
        }
      `}</style>
    </div>
  );
}

DecisionsPage.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default DecisionsPage;
