import { Sheet, Stack, Typography } from "@mui/joy";
import React from "react";

interface IProps {
  title: string;
  subTitle?: string;
}

const SectionTitle: React.FC<IProps> = ({ title, subTitle }) => {
  return (
    <Stack
      direction={{ sx: "column", sm: "row" }}
      spacing={1}
      sx={{ alignItems: "baseline" }}
    >
      <Typography level="h4" component="span">
        {title}
      </Typography>
      {subTitle && (
        <Typography level="body2" component="span">
          {subTitle}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionTitle;
