import { Button, Sheet } from "@mui/joy";
import { FC, useEffect, useMemo, useState } from "react";
import TaskStatus, { TaskStatusType } from "./TaskStatus";
import LogBox from "./LogBox";
import useSocket from "@/Hooks/useSocket";
import { SOCKET_URL } from "@/Constants/url";
import { toast } from "sonner";

interface IProps {
  canRun?: boolean;
  mode?: "train" | "apply";
  setId?: string;
  modelParams?: IModelParam;
  modelId?: string;
}

const TaskManager: FC<IProps> = ({
  canRun = true,
  mode = "apply",
  setId,
  modelParams,
  modelId,
}) => {
  const [running, setRunning] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const { isConnected, isFinished, connect, progress, latestMessage } =
    useSocket();

  const status: TaskStatusType = useMemo(() => {
    if (!running) return "waiting";
    if (!isConnected && !isFinished) return "connecting";
    if (!isFinished) return "running";
    return "finished";
  }, [isConnected, isFinished, running]);

  useEffect(() => {
    if (latestMessage) {
      setMessages((prev) => [...prev, latestMessage as string]);
    }
  }, [latestMessage]);

  const handleRunModel = () => {
    if (!setId) {
      toast.error("没有选择有效数据集");
      return;
    }
    setRunning(true);
    if (mode === "train") {
      if (!modelParams) {
        toast.error("请填写所有模型参数");
        return;
      }
      connect(SOCKET_URL, { task: mode, setId, modelParams });
    } else if (mode === "apply") {
      if (!modelId) {
        toast.error("没有选择有效模型");
        return;
      }
      connect(SOCKET_URL, { task: mode, setId, modelId });
    }
  };
  return (
    <Sheet sx={{ px: 4 }}>
      <Sheet
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={handleRunModel} disabled={running || !canRun}>
          {mode === "train" ? "训练模型" : "应用模型"}
        </Button>
      </Sheet>
      {running && (
        <>
          <TaskStatus status={status} progress={progress} />
          <LogBox messages={messages} />
        </>
      )}
    </Sheet>
  );
};

export default TaskManager;
