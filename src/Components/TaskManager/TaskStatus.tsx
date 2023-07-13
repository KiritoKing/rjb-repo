import { CircularProgress, LinearProgress, Sheet, Typography } from "@mui/joy";
import { FC, useMemo } from "react";
import DoneIcon from "@mui/icons-material/Done";

export type TaskStatusType = "connecting" | "running" | "finished" | "waiting";

const TaskStatus: FC<{
  status: TaskStatusType;
  progress?: number;
}> = ({ progress, status }) => {
  const element = useMemo(() => {
    if (status === "connecting") {
      return (
        <Sheet
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>连接模型服务中……</Typography>
        </Sheet>
      );
    } else if (status === "running") {
      return (
        <Sheet sx={{ display: "flex", px: 2, gap: 4, widows: "100%" }}>
          <Typography>{progress}%</Typography>
          <LinearProgress
            sx={{
              flex: 1,
              bgcolor: "transparent",
              ":before": {
                transition: "all 0.1s ease-in-out",
              },
            }}
            determinate
            value={progress}
          />
        </Sheet>
      );
    } else if (status === "finished") {
      return (
        <Sheet
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DoneIcon sx={{ fontSize: "1.5rem" }} color="success" />
          <Typography>模型运行完成</Typography>
        </Sheet>
      );
    } else {
      return <></>;
    }
  }, [status, progress]);

  return <Sheet sx={{ py: 4 }}>{element}</Sheet>;
};

export default TaskStatus;
