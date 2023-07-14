import { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import useApi from "./useApi";
import { toast } from "sonner";

export default function useAxios<T>(
  url: string,
  options?: AxiosRequestConfig,
  onSuccess?: (data: AxiosResponse<T>) => void,
  onError?: (error: Error) => void
) {
  const api = useApi();
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData: (payload?: unknown) => Promise<boolean> = async (
    payload
  ) => {
    try {
      setLoading(true);
      const { status, data, statusText } = await api<AxiosResponse<T>>(url, {
        data: payload,
        ...options,
      });

      // console.log(data);

      if (status === 200) {
        setData(data.data);
        onSuccess?.(data);
      } else {
        throw new Error(statusText);
      }
      setLoading(false);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof AxiosError && error.code === "ECONNABORTED") {
          setError("请求超时，请确保后端服务已正常启动");
        } else {
          setError(error.message);
        }
        onError?.(error);
      } else {
        console.log("useAxios: 发生未知错误");
      }
      setLoading(false);
      return false;
    }
  };

  return [data, error, loading, fetchData] as const;
}
