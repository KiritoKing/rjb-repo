import { Sheet, Typography } from "@mui/joy";
import UploadButton from "./UploadButton";
import { useState } from "react";
import FileList from "./FileList";

const FileUpload = () => {
  const [files, setFiles] = useState<IFileInfo[]>([]);

  const handleUpload = (file: File) => {
    setFiles((files) => [...files, { title: file.name, blob: file }]);
  };

  const handleDelete = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index));
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
            选择用于预测的文件
          </Typography>
          <UploadButton onUpload={handleUpload} />
        </Sheet>
        <FileList files={files} onDeleteItem={handleDelete} />
      </Sheet>
    </Sheet>
  );
};

export default FileUpload;
