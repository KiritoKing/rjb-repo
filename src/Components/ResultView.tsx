import useGlobalState from "@/Hooks/useGlobalState";
import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";
import LineChart from "./LineChart";

const ResultView = () => {
  const { tableData } = useGlobalState();
  return (
    <SectionCard>
      <SectionTitle title="结果预览" subTitle="Result Preview" />
      <LineChart data={tableData} />
    </SectionCard>
  );
};

export default ResultView;
