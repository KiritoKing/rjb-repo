import { Button, Sheet } from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import TaskStatus, { TaskStatusType } from "./TaskStatus";
import LogBox from "./LogBox";
import useSocket from "@/Hooks/useSocket";

const TaskManager = () => {
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
    setRunning(true);
    connect("http://localhost:4567");
    // connect("http://192.168.173.159:5000");
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
        <Button onClick={handleRunModel} disabled={running}>
          运行模型
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
