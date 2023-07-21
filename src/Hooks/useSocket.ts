import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import dayjs from "dayjs";
import { toast } from "sonner";
import useGlobalState from "./useGlobalState";

type TaskParam =
  | {
      task: "apply";
      modelId: string;
      setId: string;
    }
  | {
      task: "train";
      setId: string;
      modelParams: TrainParams;
    }
  | {
      task: "realtime";
      modelId: string;
      columns: TableRow;
      data: TableRow;
    };

export default function useSocket() {
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(
    socket.current?.connected ?? false
  );
  const [latestMessage, setLatestMessage] = useState<unknown>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const pushTableData = useGlobalState((s) => s.pushTableData);

  const taskParams = useRef<TaskParam | null>();

  const connect = (url: string, params?: TaskParam) => {
    taskParams.current = params;
    socket.current = io(url, { autoConnect: false, reconnection: false });
    socket.current.connect();
    initSocket();
  };

  const disconnect = () => {
    if (socket.current?.connected) {
      socket.current?.disconnect();
    }
    socket.current?.off("connect");
    socket.current?.off("disconnect");
    socket.current?.off("message");
    socket.current?.off("progress");
    socket.current?.off("done");
    socket.current = null;
  };

  const initSocket = () => {
    if (!socket.current) return;
    socket.current.on("connect", () => {
      setIsConnected(true);
      toast("WebSocket已连接");
      setLatestMessage("[WebSocket] Connected!");
      // taskParams为空时为dry-run，仅连接不`run`
      if (taskParams.current) {
        socket.current?.emit("run", taskParams.current);
      }
    });
    socket.current.on("disconnect", () => {
      setIsConnected(false);
      toast("WebSocket断开连接");
    });
    socket.current.on("message", (data) => {
      setLatestMessage(`[${dayjs()}] ${data as string}`);
    });
    socket.current.on("progress", (data: unknown) => {
      if (Number.isNaN(data)) return;
      const progress = Number(data);
      if (progress <= 1) setProgress(progress * 100);
      else setProgress(progress);
    });
    socket.current.on("data", (data: TableRow[]) => {
      console.log(data);
    });
    socket.current.on(
      "done",
      (data: { type: "train" | "apply"; data: TableRow[] }) => {
        if (data.type === "apply" && data.data) {
          pushTableData(data.data);
          console.log(data.data);
        } else if (data.type === "train") {
          // TODO: 训练完成后，更新结果预览曲线
          toast("训练完成");
        }
        setIsFinished(true);
        setLatestMessage("[WebSocket] Finished!");
        if (socket.current?.connected) disconnect();
      }
    );
  };

  const sendStreamingItem = (param: TaskParam) => {
    socket.current?.emit("run", param);
  };

  // 组件注销时，关闭socket连接
  useEffect(() => {
    return disconnect;
  }, []);

  return {
    isConnected,
    isFinished,
    latestMessage,
    progress,
    connect,
    disconnect,
    sendStreamingItem,
  };
}
