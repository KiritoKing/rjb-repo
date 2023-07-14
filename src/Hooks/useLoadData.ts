import { AxiosRequestConfig } from "axios";
import useAxios from "./useAxios";
import { toast } from "sonner";
import { useEffect } from "react";
import useGlobalState from "./useGlobalState";

export default function useLoadData<T>(
  url: string,
  options?: AxiosRequestConfig & {
    autoLoad?: boolean;
    successText?: string;
    errorText?: string;
  }
) {
  const { autoLoad, successText, errorText, ...rest } = options ?? {};
  const isLogin = useGlobalState((state) => !!state.username);
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
      console.error("Error:", error);
      errorText && toast.error(`${errorText}： ${error}`);
    }
  );

  useEffect(() => {
    autoLoad && execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad, isLogin]);

  return [data, loading, execute] as const;
}
