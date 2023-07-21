import { Sheet, Stack, Typography, styled } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { FC, useRef } from "react";
import Collapse from "../General/Collapse";

const Header = styled("div")`
  background-color: #e0e0e0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 10px;
  ::before {
    content: " ";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fd6458;
    box-shadow: 20px 0 0 #ffbf2b, 40px 0 0 #24cc3d;
  }
`;

const ExpandButton = styled("span")`
  vertical-align: middle;
  margin-left: 10px;
  transition: transform 0.2s;
  :hover {
    cursor: pointer;
  }
`;

const Content = styled("div")`
  width: 100%;
  font-size: 12px;
  overflow: scroll;
  white-space: wrap;
  margin: 0;
  padding: 10px;
  background-color: #ededed;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const LogBox: FC<{
  messages?: string[];
}> = ({ messages }) => {
  const [showDetail, setShowDetail] = React.useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Sheet sx={{ px: "var(--log-box-padding)", mt: 2, pt: 1 }}>
      <Header>
        <Sheet
          sx={{
            ml: "55px",
            bgcolor: "transparent",
            display: "inline",
            verticalAlign: "center",
          }}
        >
          <Typography display="inline">运行日志</Typography>
          <ExpandButton
            onClick={() => {
              setShowDetail((val) => !val);
            }}
          >
            {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ExpandButton>
        </Sheet>
      </Header>
      <Content>
        <Collapse open={showDetail}>
          <Stack
            direction="column-reverse"
            spacing={1}
            sx={{
              bgcolor: "transparent",
            }}
            ref={logContainerRef}
          >
            {messages?.map((msg, index) => (
              <Sheet
                key={index}
                sx={{
                  bgcolor: "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                <Typography fontSize="12px">{msg}</Typography>
              </Sheet>
            ))}
          </Stack>
        </Collapse>
      </Content>
    </Sheet>
  );
};

export default LogBox;
