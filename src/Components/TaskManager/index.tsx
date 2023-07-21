import {
  Button,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { FC, useEffect, useRef, useState } from "react";
import TaskStatus from "./TaskStatus";
import LogBox from "./LogBox";
import useSocket from "@/Hooks/useSocket";
import { SOCKET_URL } from "@/Constants/url";
import { toast } from "sonner";
import FluentSwitch from "../General/FluentSwitch";
import useGlobalState from "@/Hooks/useGlobalState";
import { useLatest } from "@reactuses/core";

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
  const [streamingMode, setStreamingMode] = useState<"manual" | "auto">(
    "manual"
  );
  const [messages, setMessages] = useState<string[]>([]);
  const [sendInterval, setSendInterval] = useState(5000);
  const timer = useRef<number | null>(null);
  const tableData = useGlobalState((s) => s.tableData);
  const currentRow = useRef<number | null>(0);

  const {
    isConnected,
    taskStatus,
    connect,
    disconnect,
    progress,
    latestMessage,
    sendStreamingItem,
  } = useSocket();

  const latestConnected = useLatest(isConnected);

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
      if (!streaming) {
        connect(SOCKET_URL, { task: mode, setId, modelId });
      } else {
        connect(SOCKET_URL);
        currentRow.current = 0;
      }
    }
  };

  const handleSendingStream = () => {
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
  };

  const handleCreateInterval = () => {
    handleSendingStream();
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      if (latestConnected.current) {
        handleSendingStream();
        return;
      } else if (timer.current) {
        clearInterval(timer.current);
      }
    }, sendInterval);
  };

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
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography level="body2">模拟实时输入</Typography>
              <FluentSwitch
                checked={streaming}
                onChange={(value) => setStreaming(value)}
              />
            </Stack>
            {streaming && (
              <>
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
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ alignItems: "center", transition: "all 0.3s ease" }}
                >
                  <Stack direction="row" spacing={1}>
                    {streamingMode === "manual" ? (
                      <>
                        <Button
                          onClick={handleSendingStream}
                          disabled={!isConnected}
                        >
                          发送数据
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input
                          type="number"
                          value={sendInterval}
                          onChange={(e) => setSendInterval(+e.target.value)}
                          placeholder="自动发送间隔"
                          endDecorator="ms"
                        />
                        <Button
                          onClick={handleCreateInterval}
                          disabled={!isConnected}
                        >
                          开始任务
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>
              </>
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
      {running && (
        <>
          <TaskStatus status={taskStatus} progress={progress} />
          <LogBox messages={messages} />
        </>
      )}
    </Sheet>
  );
};

export default TaskManager;
