import { useAggregationsWavelength } from "../queries/impermanentDigital";
import AnimatedSpinner from "../components/AnimatedSpinner";
import StatisticCard, { StatisticCardRow } from "../components/StatisticCard";

function WavelengthStatisticsCardContainer({ wavelength }) {
  const { data, isFetching, isSuccess } = useAggregationsWavelength({
    wavelength,
  });

  return (
    <>
      <StatisticCard
        heading={wavelength}
        isFetching={isFetching}
        suffix="burned"
      >
        {data?.countBurned?.aggregate.count.toLocaleString()}
      </StatisticCard>
      <StatisticCard
        heading={wavelength}
        isFetching={isFetching}
        suffix="untouched"
      >
        {data?.countUntouched?.aggregate.count.toLocaleString()}
      </StatisticCard>
      <StatisticCard
        heading={wavelength}
        isFetching={isFetching}
        suffix="total"
      >
        {data?.countAll?.aggregate.count.toLocaleString()}
      </StatisticCard>
    </>
  );
}

export default WavelengthStatisticsCardContainer;
