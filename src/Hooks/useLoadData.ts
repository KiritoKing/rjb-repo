import { AxiosRequestConfig } from "axios";
import useAxios from "./useAxios";
import { toast } from "sonner";
import { useEffect } from "react";

export default function useLoadData<T>(
  url: string,
  options?: AxiosRequestConfig & {
    autoLoad?: boolean;
    successText?: string;
    errorText?: string;
  }
) {
  const { autoLoad, successText, errorText, ...rest } = options ?? {};
  const [data, error, loading, execute] = useAxios<T>(
    url,
    {
      method: "get",
      ...rest,
    },
    () => {
      successText && toast.success(successText);
    },
    () => {
      console.log("REE");
      errorText && toast.error(`${errorText}： ${error}`);
    }
  );
  useEffect(() => {
    autoLoad && execute();
  }, []);
  return [data, loading, execute] as const;
}
