import { Card, Stack } from "@mui/joy";
import React, { PropsWithChildren } from "react";

const SectionCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        p: "var(--card-padding)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        {children}
      </Stack>
    </Card>
  );
};

export default SectionCard;
