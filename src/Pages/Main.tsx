import ModelManager from "@/Components/ModelManage";
import { Button, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import SectionTitle from "@/Components/General/SectionTitle";
import { Link } from "react-router-dom";
import SectionCard from "@/Components/General/SectionCard";
import FileManager from "@/Components/FileManage";
import TaskManager from "@/Components/TaskManager";
import { useEffect, useState } from "react";
import LineChart from "@/Components/LineChart";
import useGlobalState from "@/Hooks/useGlobalState";

const Main = () => {
  const [setId, setSetId] = useState<string>();
  const [modelId, setModelId] = useState<string>();
  const tableData = useGlobalState((state) => state.tableData);
  const setTableData = useGlobalState((state) => state.setTableData);

  useEffect(() => {
    return () => setTableData();
  }, [setTableData]);

  const handleFileChange = (ready: boolean, setId?: string) => {
    setSetId(setId);
  };

  const handleModelChange = (modelId: string) => {
    setModelId(modelId);
  };

  return (
    <>
      <SectionCard>
        <Sheet sx={{ display: "flex", justifyContent: "space-between" }}>
          <SectionTitle title="模型管理" subTitle="Model Management" />
          <Button to="train" component={Link} startDecorator={<AddIcon />}>
            训练模型
          </Button>
        </Sheet>
        <ModelManager onChange={handleModelChange} />
      </SectionCard>

      <SectionCard>
        <SectionTitle title="模型应用" subTitle="Model Apply" />
        <FileManager onChange={handleFileChange} />
        <TaskManager
          canRun={!!setId && !!modelId}
          setId={setId}
          modelId={modelId}
        />
      </SectionCard>

      <SectionCard>
        <SectionTitle title="结果预览" subTitle="Result Preview" />
        <LineChart data={tableData} />
      </SectionCard>
    </>
  );
};

export default Main;
