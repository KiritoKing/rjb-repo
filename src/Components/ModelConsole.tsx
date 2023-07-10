import useSocket from "@/Hooks/useSocket";
import { Sheet } from "@mui/joy";
import React from "react";

const ConnectStatus: React.FC<{ connected: boolean }> = ({ connected }) => {
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <div
        style={{
          backgroundColor: connected ? "#2a6e3f" : "#c12c1f",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
        }}
      />
      {connected ? "已连接" : "未连接"}
    </Sheet>
  );
};

const ModelConsole = () => {
  const { isConnected, latestMessage, progress, socket } = useSocket();

  return (
    <Sheet>
      <ConnectStatus connected={isConnected} />
      <button onClick={() => socket.connect()}>Connect</button>
    </Sheet>
  );
};

export default ModelConsole;
