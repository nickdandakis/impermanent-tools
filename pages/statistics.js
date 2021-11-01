import Head from "next/head";

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
      <Head>
        <title key="title">Impermanent Tools | Statistics Dashboard</title>
        <meta
          name="description"
          content="Huge alpha for your due dilly"
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.impermanent.tools/images/perma-hands.png"
          key="og:image"
        />
      </Head>
      <header>
        Supplements the&nbsp;
        <a href="https://dune.xyz/dandankis/Impermanent-Digital">
          Dune dashboard
        </a>
        . Shout-out <a href="https://zora.co">Zora</a> for the Indexer API love
        🥰 wagmi 📈
      </header>
      <div className="container">
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
      </div>
      <style jsx>{`
        .statistics-page {
          width: 100%;
        }

        header {
          padding-top: 80px;
          padding-bottom: 80px;
          max-width: 30ch;
          margin: 0 auto;
        }

        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-template-rows: repeat(6, 200px);
          grid-gap: 40px;
          grid-auto-flow: dense;
          width: 100%;
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
