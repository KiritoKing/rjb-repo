import { Sheet, Typography } from "@mui/joy";
import UploadButton from "./UploadButton";
import { useEffect, useState } from "react";
import FileList from "./FileList";
import useCsv from "@/Hooks/useCsv";
import useStore from "@/Hooks/useStore";
import useAxios from "@/Hooks/useAxios";
import useApi from "@/Hooks/useApi";
import { toast } from "sonner";

const FileUpload = () => {
  const setTableData = useStore((state) => state.setTableData);
  const [csvFiles, setCsvFiles] = useState<IFileInfo[]>([]);
  const api = useApi();

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { status, data: resp } = await api.post<
      AxiosResponse<UploadResponse>
    >("model/fileUpload", formData);
    if (status === 200) {
      const { code, data, msg } = resp;
      if (code !== 0 || !data) {
        toast.error(`上传失败：${msg}`);
        return;
      }
    }
  };

  return (
    <Sheet sx={{ mt: 2 }}>
      <Sheet
        sx={{
          mx: 2,
          px: 4,
          py: 2,
          border: "1px dashed gray",
          borderRadius: "10px",
        }}
      >
        <Sheet sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ flex: 1 }} level="h5" component="span">
            选择要上传的文件
          </Typography>
          <UploadButton onUpload={handleUpload} />
        </Sheet>
        <FileList files={csvFiles} />
      </Sheet>
    </Sheet>
  );
};

export default FileUpload;
