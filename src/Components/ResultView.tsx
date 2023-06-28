import useStore from "@/Hooks/useStore";
import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";
import LineChart from "./LineChart";

const ResultView = () => {
  const { tableData } = useStore();
  return (
    <SectionCard>
      <SectionTitle title="结果预览" subTitle="Result Preview" />
      <LineChart data={tableData} />
    </SectionCard>
  );
};

export default ResultView;
