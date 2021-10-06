import { useState, useCallback, useEffect } from "react";

import stages from "../data/stages";
import PageLayout from "../components/PageLayout";
import SimulatePageFooter from "../components/SimulatePageFooter";
import IDInput from "../components/IDInput";
import allMetadata from "../data/metadata.json";
import SimulateStageSection from "../components/SimulateStageSection";
import SimulateActions from "../components/SimulateActions";
import classNames from "../utils/classNames";
import getRandomInt from "../utils/getRandomInt";
import { getSignatureEditionTrait } from "../utils/traits";
import CarouselNavigation from "../components/CarouselNavigation";

function SimulatePage() {
  const [inputValue, setInputValue] = useState("");
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [answeredStageIndex, setAnsweredStageIndex] = useState(-1);
  const [metadataByStage, setMetadataByStage] = useState([]);
  const [hasSold, setHasSold] = useState(false);

  const isSignatureEdition =
    metadataByStage.length > 0 &&
    !!getSignatureEditionTrait({ metadata: metadataByStage[0] });

  const handleReset = () => {
    const castedID = Number(inputValue);
    const hasID = inputValue?.length !== 0;
    const isValidID = !isNaN(castedID) && castedID < 4444;
    const metadata = isValidID ? allMetadata[castedID] : null;

    setActiveStageIndex(-1);
    setAnsweredStageIndex(-1);

    if (metadata) {
      setMetadataByStage([metadata]);
      setHasSold(false);
      setActiveStageIndex(0);
    }
  };

  useEffect(() => {
    if (inputValue?.length === 0) {
      setInputValue(getRandomInt(0, 4444));
    }
  }, []);

  useEffect(() => {
    handleReset();
  }, [inputValue]);

  const handleInputChange = (event) => {
    const updatedID = event.target.value || "";

    setInputValue(updatedID);
    handleReset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePreviousStage = () => {
    setActiveStageIndex(
      (previousActiveStageIndex) => previousActiveStageIndex - 1
    );
  };

  const handleNextStage = () => {
    setActiveStageIndex(
      (previousActiveStageIndex) => previousActiveStageIndex + 1
    );
  };

  return (
    <div className="decisions-page">
      <div className="two-up">
        <div className="column side">
          <div className={classNames("container", hasSold && "has-sold")}>
            <div className="carousel">
              {activeStageIndex !== -1 &&
                stages.map((stage, stageIndex) => (
                  <div className="slide" key={stageIndex}>
                    <SimulateStageSection
                      stageIndex={stageIndex}
                      activeStageIndex={activeStageIndex}
                      metadata={metadataByStage[stageIndex]}
                    />
                  </div>
                ))}
            </div>
            <div className="carousel-navigation-wrapper">
              <CarouselNavigation
                isPreviousDisabled={activeStageIndex <= 0}
                isNextDisabled={
                  activeStageIndex > stages.length - 1 ||
                  answeredStageIndex < activeStageIndex
                }
                onPrevious={handlePreviousStage}
                onNext={handleNextStage}
              />
            </div>
          </div>
        </div>
        <div className="column main">
          <div className="input-wrapper">
            <IDInput value={inputValue} onChange={handleInputChange} />
            <button onClick={handleReset} disabled={inputValue.length === 0}>
              ⟳
            </button>
          </div>
          {activeStageIndex > -1 && (
            <header>
              <div className="heading-wrapper">
                <h3>{stages[activeStageIndex]?.heading}</h3>
              </div>
              <p>
                {stages[activeStageIndex]?.body({
                  metadata: metadataByStage[activeStageIndex],
                })}
              </p>
            </header>
          )}
          {activeStageIndex > -1 && !isSignatureEdition && (
            <SimulateActions
              stage={stages[activeStageIndex]}
              metadata={metadataByStage[activeStageIndex]}
              isStageDisabled={
                hasSold || answeredStageIndex >= activeStageIndex
              }
              onPreviousStage={handlePreviousStage}
              onNextStage={handleNextStage}
              onMetadataUpdate={({ stageIndex, updatedMetadata }) => {
                if (stageIndex > answeredStageIndex) {
                  setAnsweredStageIndex(stageIndex);
                }
                setMetadataByStage([...metadataByStage, updatedMetadata]);
              }}
              onSell={() => setHasSold(true)}
            />
          )}
          <hr />
          <SimulatePageFooter />
        </div>
      </div>
      <style jsx>{`
        .decisions-page {
          flex: 1;
          display: flex;
          flex-flow: column;
          justify-content: center;
          padding-top: 40px;
        }

        .input-wrapper {
          display: flex;
          flex-flow: row;
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

        header p {
          max-width: 55ch;
        }

        .column.side {
          display: flex;
          flex-flow: column;
        }

        .column.main {
          text-align: left;
          padding: 0 20px;
        }

        .has-sold {
          opacity: 0.5;
          pointer-events: none;
        }

        .heading-wrapper {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
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

        .carousel-navigation-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
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

        hr {
          margin: 30px 0;
        }

        @media (max-width: 500px) {
          .column.main {
            min-width: 100%;
            padding: 0;
          }

          .two-up > .column {
            min-width: 100%;
          }

          .container {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

SimulatePage.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default SimulatePage;
