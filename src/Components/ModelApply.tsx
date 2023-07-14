import FileManager from "./FileManage";
import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";
import TaskManager from "./TaskManager";

const ModelApply = () => {
  return (
    <SectionCard>
      <SectionTitle title="模型应用" subTitle="Model Apply" />
      <FileManager />
      <TaskManager />
    </SectionCard>
  );
};

export default ModelApply;
