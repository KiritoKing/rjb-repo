import axios, { HeadersDefaults } from "axios";
import { useMemo } from "react";

export const BASE_API_URL = "/api";

/**
 * 用于快速创建Axios实例，默认绑定到/api路径，带cookies
 * @param prefix 在BASE_URL后面的路径，用于创建具体URL的实例
 * @param timeout 请求等待时间，默认1s（1000ms）
 * @param headers 自定义Axios请求Headers
 * @returns Axios实例
 */
export default function useApi(
  prefix?: string,
  timeout = 1000,
  headers: Partial<HeadersDefaults> = {}
) {
  const url = useMemo(() => {
    const rawPrefix = prefix?.startsWith("/") ? prefix.slice(1) : prefix;
    return prefix ? `${BASE_API_URL}/${rawPrefix}` : BASE_API_URL;
  }, [prefix]);

  const instance = useMemo(
    () =>
      axios.create({
        baseURL: url,
        timeout,
        headers,
        withCredentials: true,
      }),
    [headers, timeout, url]
  );
  return instance;
}
