import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { Alert, ColorPaletteProp } from "@mui/joy";

const enum ToastTypeEnum {
  Success = "success",
  Error = "danger",
  Warning = "warning",
  Info = "primary", // primary
  Default = "neural", // neural
}

export default function useToast() {
  const memoedToast = useCallback(
    (message: string, type: ToastTypeEnum = ToastTypeEnum.Default) => {
      toast.custom((toastId) => (
        <Alert color={type as ColorPaletteProp} variant="solid">
          {message}
        </Alert>
      ));
    },
    []
  );

  return memoedToast;
}
