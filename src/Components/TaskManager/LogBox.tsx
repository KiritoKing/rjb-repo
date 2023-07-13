import { IconButton, Sheet, Typography } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { FC } from "react";

const LogBox: FC<{
  messages?: string[];
}> = ({ messages }) => {
  const [showDetail, setShowDetail] = React.useState(false);

  return (
    <Sheet
      sx={{ px: 4, mt: 2, pt: 1, bgcolor: "#f5f3f2", borderRadius: "5px" }}
    >
      <Sheet
        sx={{
          mb: 2,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>运行日志</Typography>
        <IconButton
          variant="plain"
          onClick={() => {
            setShowDetail((val) => !val);
          }}
        >
          {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Sheet>
      {showDetail && (
        <Sheet
          sx={{
            width: "100%",
            my: 4,
            px: 2,

            maxHeight: "500px",
            overflowY: "scroll",
            transition: "all 1s linear",
          }}
        >
          {messages?.map((msg, index) => (
            <Sheet key={index} sx={{ bgcolor: "transparent", py: 2 }}>
              <Typography>{msg}</Typography>
            </Sheet>
          ))}
        </Sheet>
      )}
    </Sheet>
  );
};

export default LogBox;
