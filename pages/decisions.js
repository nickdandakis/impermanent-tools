import { useState, useCallback } from 'react';

import stages from '../data/stages';
import PageLayout from '../components/PageLayout';
import DecisionsPageHeader from '../components/DecisionsPageHeader';
import IDInput from '../components/IDInput';
import allMetadata from '../data/metadata.json';
import DecisionsStageSection from '../components/DecisionsStageSection';

function DecisionsPage() {
  const [inputValue, setInputValue] = useState('');
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [metadataByStage, setMetadataByStage] = useState([]);
  const [hasSold, setHasSold] = useState(false);

  const handleInputChange = useCallback((event) => {
    const updatedID = event.target.value || '';

    setInputValue(updatedID);
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
      setActiveStageIndex(0);
      setHasSold(false);
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
        <input type="submit" />
      </form>
      {stages.map((stage, stageIndex) => (activeStageIndex >= stageIndex) && (
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
      <style jsx>{`
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
