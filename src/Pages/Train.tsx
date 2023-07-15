import SectionCard from "@/Components/General/SectionCard";
import SectionTitle from "@/Components/General/SectionTitle";
import { IconButton, Sheet } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ModelInfo from "@/Components/ModelManage/ModelInfo";
import FileManager from "@/Components/FileManage";
import TaskManager from "@/Components/TaskManager";
import { useEffect, useState } from "react";
import LineChart from "@/Components/LineChart";
import useGlobalState from "@/Hooks/useGlobalState";

const Train = () => {
  const nav = useNavigate();
  const [canRun, setCanRun] = useState(false);
  const tableData = useGlobalState((state) => state.tableData);
  const setTableData = useGlobalState((state) => state.setTableData);

  useEffect(() => {
    return () => setTableData();
  }, [setTableData]);

  const handleBack = () => {
    nav(-1);
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
        <ModelInfo />
        <FileManager onChange={(value) => setCanRun(value)} />
        <TaskManager canRun={canRun} mode="train" />
      </SectionCard>
      <SectionCard>
        <SectionTitle title="效果预览" subTitle="Preview" />
        <LineChart data={tableData} />
      </SectionCard>
    </>
  );
};

export default Train;
