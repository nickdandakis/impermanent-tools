import { useAggregationsEvolution } from "../queries/impermanentDigital";
import AnimatedSpinner from "../components/AnimatedSpinner";
import StatisticCard, { StatisticCardRow } from "../components/StatisticCard";

function EvolutionStatisticsCardContainer({ lifecycle, evolution }) {
  const { data, isFetching, isSuccess } = useAggregationsEvolution({
    lifecycle,
    evolution,
  });

  const countUntouched =
    data?.countAll?.aggregate.count - data?.countEvolved?.aggregate.count;

  return (
    <>
      <StatisticCard
        heading={`Evolution ${evolution} (Lifecycle ${lifecycle})`}
        isFetching={isFetching}
        suffix="evolved"
      >
        {data?.countEvolved?.aggregate.count.toLocaleString()}
      </StatisticCard>
      <StatisticCard
        heading={`Evolution ${evolution} (Lifecycle ${lifecycle})`}
        isFetching={isFetching}
        suffix="untouched"
      >
        {countUntouched.toLocaleString()}
      </StatisticCard>
      <StatisticCard
        heading={`Evolution ${evolution} (Lifecycle ${lifecycle})`}
        isFetching={isFetching}
        suffix="total"
      >
        {data?.countAll?.aggregate.count.toLocaleString()}
      </StatisticCard>
    </>
  );
}

export default EvolutionStatisticsCardContainer;
