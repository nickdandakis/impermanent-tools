import { useState, useCallback } from 'react';

import stages from '../data/stages';
import PageLayout from '../components/PageLayout';
import DecisionsPageHeader from '../components/DecisionsPageHeader';
import IDInput from '../components/IDInput';
import allMetadata from '../data/metadata.json';
import DecisionsStageSection from '../components/DecisionsStageSection';
import classNames from '../utils/classNames';

function DecisionsPage() {
  const [inputValue, setInputValue] = useState('');
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [metadataByStage, setMetadataByStage] = useState([]);
  const [hasSold, setHasSold] = useState(false);

  const handleInputChange = useCallback((event) => {
    const updatedID = event.target.value || '';

    setInputValue(updatedID);
    setActiveStageIndex(-1);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const castedID = Number(inputValue);
    const hasID = inputValue?.length !== 0;
    const isValidID = !isNaN(castedID) && (castedID < 4444);
    const metadata = (
      isValidID
      ? allMetadata[castedID]
      : null
    );

    if (metadata) {
      setMetadataByStage([metadata]);
      setHasSold(false);
      setActiveStageIndex(0);
    }
  }

  return (
    <div className="decisions-page">
      <DecisionsPageHeader />
      <form onSubmit={handleSubmit}>
        <IDInput
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>
          Begin simulation
        </button>
      </form>
      <div className={classNames('container', hasSold && 'has-sold')}>
        {activeStageIndex !== -1 && stages.map((stage, stageIndex) => (activeStageIndex >= stageIndex) && (
          <DecisionsStageSection
            key={stageIndex}
            stageIndex={stageIndex}
            activeStageIndex={activeStageIndex}
            metadata={metadataByStage[stageIndex]}
            hasSold={hasSold}
            onNextStage={() => {
              setActiveStageIndex(previousActiveStageIndex => previousActiveStageIndex + 1)
            }}
            onMetadataUpdate={({ stageIndex, updatedMetadata }) => setMetadataByStage([
              ...metadataByStage,
              updatedMetadata,
            ])}
            onSell={() => setHasSold(true)}
          />
        ))}
      </div>
      <style jsx>{`
        .has-sold {
          opacity: 0.5;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

DecisionsPage.getLayout = (page) => (
  <PageLayout>
    {page}
  </PageLayout>
);

export default DecisionsPage;
