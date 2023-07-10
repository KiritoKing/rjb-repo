import axios, { HeadersDefaults } from "axios";
import { useMemo } from "react";

const BASE_URL = "/api";

export default function useApi(
  prefix?: string,
  timeout = 1000,
  headers: Partial<HeadersDefaults> = {}
) {
  const url = useMemo(() => {
    const rawPrefix = prefix?.startsWith("/") ? prefix.slice(1) : prefix;
    return prefix ? `${BASE_URL}/${rawPrefix}` : BASE_URL;
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
