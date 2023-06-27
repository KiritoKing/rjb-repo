import { Button, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import ModelList from "./ModelList";
import SectionCard from "./General/SectionCard";
import SectionTitle from "./General/SectionTitle";

const testData: IModelInfo[] = [
  {
    id: 1,
    name: "模型1",
  },
  {
    id: 2,
    name: "模型2",
  },
];

const ModelManage = () => {
  return (
    <SectionCard>
      <Sheet sx={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle title="模型管理" subTitle="Model Mangement" />
        <Button startDecorator={<AddIcon />}>训练模型</Button>
      </Sheet>
      <Sheet sx={{ px: 2, my: 2 }}>
        <ModelList options={testData} />
      </Sheet>
    </SectionCard>
  );
};

export default ModelManage;
