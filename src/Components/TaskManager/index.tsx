import { Button, Option, Select, Sheet, Stack, Typography } from "@mui/joy";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import TaskStatus from "./TaskStatus";
import LogBox from "./LogBox";
import useSocket from "@/Hooks/useSocket";
import { SOCKET_URL } from "@/Constants/url";
import { toast } from "sonner";
import FluentSwitch from "../General/FluentSwitch";
import useGlobalState from "@/Hooks/useGlobalState";

interface IProps {
  canRun?: boolean;
  mode?: "train" | "apply";
  setId?: string;
  modelParams?: TrainParams;
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
  const [streaming, setStreaming] = useState(false);
  const [streamingMode, setStreamingMode] = useState<"manual" | "auto">("auto");
  const [messages, setMessages] = useState<string[]>([]);
  const [sendInterval, setSendInterval] = useState(5000);
  const tableData = useGlobalState((s) => s.tableData);
  const currentRow = useRef<number | null>(0);

  const {
    isConnected,
    taskStatus,
    nextReady,
    connect,
    disconnect,
    progress,
    latestMessage,
    sendStreamingItem,
  } = useSocket();

  useEffect(() => {
    if (latestMessage) {
      setMessages((prev) => [...prev, latestMessage as string]);
    }
  }, [latestMessage]);

  const handleRunModel = useCallback(() => {
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
      if (!streaming) {
        connect(SOCKET_URL, { task: mode, setId, modelId });
      } else {
        connect(SOCKET_URL);
        currentRow.current = 0;
      }
    }
  }, [connect, mode, modelId, modelParams, setId, streaming]);

  const handleSendingStream = useCallback(() => {
    if (!modelId) {
      toast.error("没有选择有效模型");
      return;
    }
    if (!tableData.columns) {
      toast.error("没有选择有效数据集");
      return;
    }
    if (currentRow.current != null) {
      if (currentRow.current < tableData.data.length) {
        sendStreamingItem({
          task: "realtime",
          modelId,
          columns: tableData.columns,
          data: tableData.data[currentRow.current++],
        });
      } else {
        disconnect();
      }
    }
  }, [
    disconnect,
    modelId,
    sendStreamingItem,
    tableData.columns,
    tableData.data,
  ]);

  // 自动发送新请求
  useEffect(() => {
    if (
      taskStatus === "running" &&
      streaming &&
      streamingMode === "auto" &&
      nextReady
    ) {
      handleSendingStream();
    }
  }, [handleSendingStream, nextReady, streaming, streamingMode, taskStatus]);

  return (
    <Sheet sx={{ px: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mt: 1,
          justifyContent: mode === "apply" ? "space-between" : "flex-end",
          alignItems: "center",
        }}
      >
        {mode === "apply" && (
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography level="body2">模拟实时输入</Typography>
              <FluentSwitch
                checked={streaming}
                onChange={(value) => setStreaming(value)}
              />
            </Stack>
            {streaming && (
              <Stack direction="row" spacing={2}>
                <Select
                  sx={{ px: 2 }}
                  value={streamingMode}
                  onChange={(_e, v) => {
                    if (v) setStreamingMode(v);
                  }}
                  placeholder="选择一种流式输入方式"
                >
                  <Option value="manual">手动输入</Option>
                  <Option value="auto">自动输入</Option>
                </Select>
                <Button onClick={handleSendingStream} disabled={!isConnected}>
                  {streamingMode === "manual" ? "发送" : "开始"}
                </Button>
              </Stack>
            )}
          </Stack>
        )}
        <Stack direction="row" spacing={2}>
          <Button disabled={!isConnected} onClick={disconnect}>
            断开连接
          </Button>
          <Button onClick={handleRunModel} disabled={running || !canRun}>
            {mode === "train" ? "训练模型" : "启动模型"}
          </Button>
        </Stack>
      </Stack>
      {taskStatus !== "waiting" && (
        <>
          <TaskStatus status={taskStatus} progress={progress} />
          <LogBox messages={messages} />
        </>
      )}
    </Sheet>
  );
};

export default TaskManager;
