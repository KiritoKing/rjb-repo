import { styled } from "@mui/joy";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const Container = styled("div")`
  overflow-y: scroll;
  overflow-x: hidden;
  transition: 0.4s height;
`;

const Collapse: FC<
  PropsWithChildren<{
    open: boolean;
    collapseHeight?: string;
    expandHeight?: string;
  }>
> = ({ open, collapseHeight = "0px", expandHeight = "500px", children }) => {
  const [childHeight, setChildHeight] = useState("0");

  useEffect(() => {
    if (open) {
      setChildHeight(expandHeight);
    } else {
      setChildHeight(collapseHeight);
    }
  }, [collapseHeight, expandHeight, open]);

  return <Container style={{ height: childHeight }}>{children}</Container>;
};

export default Collapse;
