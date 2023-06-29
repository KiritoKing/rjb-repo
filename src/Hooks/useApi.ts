import axios from "axios";
import { useMemo } from "react";

const BASE_URL = "http://127.0.0.1:5173/api";

export default function useApi(prefix?: string, method = "get") {
  const url = prefix ? `${BASE_URL}/${prefix}` : BASE_URL;
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: url,
        timeout: 1000,
        method,
      }),
    [url, method]
  );
  return instance;
}
