import { Button, Sheet } from "@mui/joy";
import FileUpload from "./FileManage/FileUpload";
import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";

const ModelApply = () => {
  return (
    <SectionCard>
      <SectionTitle title="模型应用" subTitle="Model Apply" />
      <FileUpload />
      <Sheet
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button>运行模型</Button>
      </Sheet>
    </SectionCard>
  );
};

export default ModelApply;
