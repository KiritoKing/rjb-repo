import { Sheet } from "@mui/joy";
import ModelParams from "./ModelParams";
import FormInput from "@/Components/General/FormInput";

const testParam: IModelParam = {
  epoch: 10,
  batchSize: 128,
  learningRate: 0.01,
};

const ModelInfo = () => {
  return (
    <Sheet component="form" sx={{ px: 2 }}>
      <FormInput
        name="name"
        label="模型名称"
        labelWidth={150}
        inputWidth={400}
        required
      />
      <ModelParams params={testParam} />
    </Sheet>
  );
};

export default ModelInfo;
