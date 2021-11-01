import { useAggregationsLifecycle } from "../queries/impermanentDigital";
import AnimatedSpinner from "../components/AnimatedSpinner";
import StatisticCard, { StatisticCardRow } from "../components/StatisticCard";

function LifecycleStatisticsCardContainer({ lifecycle }) {
  const { data, isFetching, isSuccess } = useAggregationsLifecycle({
    lifecycle,
  });

  return (
    <>
      <StatisticCard
        heading={`Lifecycle ${lifecycle}`}
        isFetching={isFetching}
        suffix="burned"
      >
        {data?.countBurned?.aggregate.count.toLocaleString()}
      </StatisticCard>
      <StatisticCard
        heading={`Lifecycle ${lifecycle}`}
        isFetching={isFetching}
        suffix="untouched"
      >
        {data?.countUntouched?.aggregate.count.toLocaleString()}
      </StatisticCard>
      <StatisticCard
        heading={`Lifecycle ${lifecycle}`}
        isFetching={isFetching}
        suffix="total"
      >
        {data?.countAll?.aggregate.count.toLocaleString()}
      </StatisticCard>
    </>
  );
}

export default LifecycleStatisticsCardContainer;
