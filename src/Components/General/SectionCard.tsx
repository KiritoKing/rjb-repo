import { Card } from "@mui/joy";
import React, { PropsWithChildren } from "react";

const SectionCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card variant="outlined" sx={{ width: "100%", p: 5 }}>
      {children}
    </Card>
  );
};

export default SectionCard;
