import SectionCard from "@/Components/General/SectionCard";
import SectionTitle from "@/Components/General/SectionTitle";
import { IconButton, Sheet } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FileManager from "@/Components/FileManage";
import TaskManager from "@/Components/TaskManager";
import { useEffect, useState } from "react";
import useGlobalState from "@/Hooks/useGlobalState";
import { useImmer } from "use-immer";
import ModelInfo from "@/Components/ModelManage/ModelInfo";

const Train = () => {
  const nav = useNavigate();
  const [canRun, setCanRun] = useState(false);
  const [setId, setSetId] = useState<string>();
  const setTableData = useGlobalState((state) => state.setTableData);

  const [params, setParams] = useImmer<TrainParams>({
    name: "新模型",
    epoch: 10,
    batchSize: 128,
    learningRate: 0.01,
    inWindowSize: 10,
    outWindowSize: 1,
  });

  useEffect(() => {
    return () => setTableData();
  }, [setTableData]);

  const handleBack = () => {
    nav(-1);
  };

  const handleInfoChange = (value: TrainParams) => {
    setParams(value);
  };

  return (
    <>
      <SectionCard>
        <Sheet sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <IconButton
            onClick={handleBack}
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "gray",
              ":hover": { backgroundColor: "#efefef", borderColor: "gray" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <SectionTitle title="训练模型" subTitle="Train Model" />
        </Sheet>
        <ModelInfo data={params} onChange={handleInfoChange} />
        <FileManager
          onChange={(value, setId) => {
            setCanRun(value);
            setSetId(setId);
          }}
        />
        <TaskManager
          canRun={canRun}
          mode="train"
          setId={setId}
          modelParams={params}
        />
      </SectionCard>
    </>
  );
};

export default Train;
