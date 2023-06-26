import { Sheet, Typography } from "@mui/joy";
import React from "react";

interface IProps {
  title: string;
  subTitle?: string;
}

const SectionTitle: React.FC<IProps> = ({ title, subTitle }) => {
  return (
    <Sheet sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
      <Typography level="h4" component="span">
        {title}
      </Typography>
      {subTitle && (
        <Typography level="body2" component="span">
          {subTitle}
        </Typography>
      )}
    </Sheet>
  );
};

export default SectionTitle;
