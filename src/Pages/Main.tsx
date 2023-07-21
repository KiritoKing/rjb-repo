import ModelManager from "@/Components/ModelManage";
import { Button, Sheet, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import SectionTitle from "@/Components/General/SectionTitle";
import { Link } from "react-router-dom";
import SectionCard from "@/Components/General/SectionCard";
import FileManager from "@/Components/FileManage";
import TaskManager from "@/Components/TaskManager";
import { useEffect, useState } from "react";
import LineChart from "@/Components/LineChart";
import useGlobalState from "@/Hooks/useGlobalState";
import useApi from "@/Hooks/useApi";
import { toast } from "sonner";

const Main = () => {
  const [setId, setSetId] = useState<string>();
  const [modelId, setModelId] = useState<string>();
  const tableData = useGlobalState((state) => state.tableData);
  const setTableData = useGlobalState((state) => state.setTableData);
  const rawLength = useGlobalState((state) => state.rawDataLength);
  const api = useApi();

  useEffect(() => {
    return () => setTableData();
  }, [setTableData]);

  const handleFileChange = (ready: boolean, setId?: string) => {
    setSetId(setId);
  };

  const handleModelChange = (modelId: string) => {
    setModelId(modelId);
  };

  const handleDownloadData = async () => {
    try {
      const resp = await api.get<string>("model/fileDownload");
      if (resp.status === 200) {
        const { data } = resp;
        const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute(
            "download",
            `result-${new Date().toLocaleString()}.csv`
          );
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      } else {
        toast.error("保存文件失败");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
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
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <SectionTitle title="结果预览" subTitle="Result Preview" />
          <Button
            disabled={tableData.data.length === 0}
            onClick={handleDownloadData}
          >
            下载预测结果
          </Button>
        </Stack>
        <LineChart data={tableData} rawLength={rawLength} />
      </SectionCard>
    </>
  );
};

export default Main;
