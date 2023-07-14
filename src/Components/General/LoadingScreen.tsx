import { CircularProgress, Sheet } from "@mui/joy";
import { FC, PropsWithChildren } from "react";

const LoadingScreen: FC<
  PropsWithChildren<{
    loading: boolean;
  }>
> = ({ loading, children }) => {
  return (
    <Sheet sx={{ w: "100%" }}>
      {loading ? (
        <Sheet
          sx={{
            w: "100%",
            margin: "40px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Sheet>
      ) : (
        children
      )}
    </Sheet>
  );
};

export default LoadingScreen;
