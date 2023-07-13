interface AxiosResponse<T> {
  code: number;
  data?: T;
  msg?: string;
}

interface UploadResponse {
  columns: string[];
  fileId: string;
  setId: string;
  preview: TableRow[];
  merged: TableRow[];
}
