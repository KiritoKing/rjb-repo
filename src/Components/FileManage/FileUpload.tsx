import { Sheet, Typography } from "@mui/joy";
import UploadButton from "./UploadButton";
import { useEffect } from "react";
import FileList from "./FileList";
import useCsv from "@/Hooks/useCsv";
import useStore from "@/Hooks/useStore";

const FileUpload = () => {
  const { csvFiles, pushCsv: appendCsv, removeCsv, setTableData } = useStore();
  const [csvData] = useCsv(csvFiles);
  useEffect(() => {
    console.log(csvData);
    setTableData(csvData);
  }, [csvData, setTableData]);

  const handleUpload = (file: File) => {
    appendCsv({ title: file.name, blob: file });
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
        <FileList files={csvFiles} onDeleteItem={removeCsv} />
      </Sheet>
    </Sheet>
  );
};

export default FileUpload;
