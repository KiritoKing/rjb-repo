import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";
import LineChart from "./LineChart";

const ResultView = () => {
  return (
    <SectionCard>
      <SectionTitle title="结果预览" subTitle="Result Preview" />
      <LineChart />
    </SectionCard>
  );
};

export default ResultView;
