/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import dayjs from "dayjs";

const SOCEKT_URL = "http://localhost:4567";

export default function useSocket(url = SOCEKT_URL, autoConnect = false) {
  const socket = useRef(io(url, { autoConnect }));
  const [isConnected, setIsConnected] = useState(socket.current.connected);
  const [latestMessage, setLatestMessage] = useState<unknown>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    socket.current.on("connect", () => {
      setIsConnected(true);
      setLatestMessage("Connected!");
    });
    socket.current.on("disconnect", () => {
      setIsConnected(false);
      alert("Disconnected!");
    });
    socket.current.on("message", (data) => {
      setLatestMessage(`[${dayjs().locale()}] ${data as string}`);
    });
    socket.current.on("progress", (progress: number) => {
      setProgress(progress);
    });
    return () => {
      socket.current.off("connect");
      socket.current.off("disconnect");
      socket.current.off("message");
      socket.current.off("progress");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    socket.current.send(message);
  };

  return {
    isConnected,
    latestMessage,
    progress,
    sendMessage: handleSendMessage,
    socket: socket.current,
  };
}
