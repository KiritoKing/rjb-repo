/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import dayjs from "dayjs";
import { toast } from "sonner";

export default function useSocket() {
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(
    socket.current?.connected ?? false
  );
  const [latestMessage, setLatestMessage] = useState<unknown>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const connect = (url: string) => {
    socket.current = io(url, { autoConnect: false, reconnection: false });
    socket.current.connect();
    initSocket();
  };

  const initSocket = () => {
    if (!socket.current) return;
    socket.current.on("connect", () => {
      setIsConnected(true);
      toast("WebSocket已连接");
      setLatestMessage("[WebSocket] Connected!");
      socket.current?.emit("run");
    });
    socket.current.on("disconnect", () => {
      setIsConnected(false);
      toast("WebSocket断开连接");
    });
    socket.current.on("message", (data) => {
      setLatestMessage(`[${dayjs().valueOf()}] ${data as string}`);
    });
    socket.current.on("progress", (data: unknown) => {
      if (Number.isNaN(data)) return;
      const progress = Number(data);
      if (progress < 1) setProgress(progress * 100);
      else setProgress(progress);
    });
    socket.current.on("done", () => {
      setIsFinished(true);
      setLatestMessage("[WebSocket] Finished!");
      if (socket.current?.connected) socket.current?.disconnect();
    });
  };

  // 组件注销时，关闭socket连接
  useEffect(() => {
    return () => {
      socket.current?.disconnect();
      socket.current?.off("connect");
      socket.current?.off("disconnect");
      socket.current?.off("message");
      socket.current?.off("progress");
      socket.current?.off("done");
    };
  }, []);

  return {
    isConnected,
    isFinished,
    latestMessage,
    progress,
    connect,
  };
}
