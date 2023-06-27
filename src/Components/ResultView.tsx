import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";
import OverviewChart from "./OverviewChart";

const ResultView = () => {
  return (
    <SectionCard>
      <SectionTitle title="结果预览" subTitle="Result Preview" />
      <OverviewChart />
    </SectionCard>
  );
};

export default ResultView;
