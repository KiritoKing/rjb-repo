import { IconButton, Sheet, Typography, styled } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { FC } from "react";
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
  overflow-y: scroll;
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

  return (
    <Sheet sx={{ px: 2, mt: 2, pt: 1 }}>
      <Header>
        <Sheet
          sx={{
            ml: "55px",
            bgcolor: "transparent",
            display: "inline",
            fontSize: "14px",
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
          {messages?.map((msg, index) => (
            <Sheet key={index} sx={{ bgcolor: "transparent" }}>
              <Typography>{msg}</Typography>
            </Sheet>
          ))}
        </Collapse>
      </Content>
    </Sheet>
  );
};

export default LogBox;
