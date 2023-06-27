import { Card } from "@mui/joy";
import React, { PropsWithChildren } from "react";

const SectionCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        p: 5,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      {children}
    </Card>
  );
};

export default SectionCard;
