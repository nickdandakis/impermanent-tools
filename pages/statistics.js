import { SubHeading } from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import { useAggregationsEvolution } from "../queries/impermanentDigital";
import {
  WAVELENGTHS,
  LIFECYCLE_TRAITS,
  EVOLUTION_STAGE_2,
  LIFECYCLE_TRAIT_2,
  LIFECYCLE_TRAIT_3,
} from "../data/constants";
import WavelengthStatisticsCardContainer from "../containers/WavelengthStatisticsCardContainer";
import LifecycleStatisticsCardContainer from "../containers/LifecycleStatisticsCardContainer";
import EvolutionStatisticsCardContainer from "../containers/EvolutionStatisticsCardContainer";

function StatisticsPage() {
  return (
    <div className="statistics-page">
      {LIFECYCLE_TRAITS.map((lifecycle) => (
        <LifecycleStatisticsCardContainer
          lifecycle={lifecycle}
          key={lifecycle}
        />
      ))}
      {WAVELENGTHS.map((wavelength) => (
        <WavelengthStatisticsCardContainer
          wavelength={wavelength}
          key={wavelength}
        />
      ))}
      <EvolutionStatisticsCardContainer
        lifecycle={LIFECYCLE_TRAIT_2}
        evolution={EVOLUTION_STAGE_2}
      />
      <EvolutionStatisticsCardContainer
        lifecycle={LIFECYCLE_TRAIT_3}
        evolution={EVOLUTION_STAGE_2}
      />
      <style jsx>{`
        .statistics-page {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-template-rows: repeat(6, 200px);
          grid-gap: 40px;
          grid-auto-flow: dense;
          width: 100vw;
          padding: 40px;
        }
      `}</style>
    </div>
  );
}

StatisticsPage.getLayout = (page) => {
  return (
    <PageLayout subHeading={<SubHeading heading="Statistics Dashboard" />}>
      {page}
    </PageLayout>
  );
};

export default StatisticsPage;
