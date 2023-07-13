import { Button, Sheet } from "@mui/joy";
import FileUpload from "./FileManage/FileUpload";
import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";
import TaskManager from "./TaskManager";

const ModelApply = () => {
  return (
    <SectionCard>
      <SectionTitle title="模型应用" subTitle="Model Apply" />
      <FileUpload />
      <TaskManager />
    </SectionCard>
  );
};

export default ModelApply;
