import { Card, IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FC, useState } from "react";
import TablePreviewDialog from "./TablePreviewDialog";

interface IItemProps {
  file: IFileInfo;
  onDelete?: () => void;
  onPreview?: () => void;
}

interface IListProps {
  files: IFileInfo[];
  onDeleteItem?: (index: number) => void;
}

const FileItem: FC<IItemProps> = ({ file, onDelete, onPreview }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        mx: 2,
        mb: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography
        onClick={onPreview}
        level="body2"
        component="a"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          px: 1,
          flex: 1,
          cursor: "pointer",
        }}
      >
        <FilePresentIcon sx={{ mr: 1 }} />
        {file.title}
      </Typography>
      <IconButton
        onClick={onDelete}
        variant="plain"
        sx={{
          color: "gray",
          ":hover": {
            backgroundColor: "transparent",
            color: "#d63031",
          },
        }}
      >
        <HighlightOffIcon />
      </IconButton>
    </Card>
  );
};

const FileList: FC<IListProps> = ({ files, onDeleteItem }) => {
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<IFileInfo>();

  const handlePreivew = (index: number) => {
    setCurrentFile(files[index]);
    setPreviewDialogOpen(true);
  };

  if (files.length === 0) {
    return (
      <Typography
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        component="div"
      >
        <UploadFileIcon sx={{ mr: 1 }} />
        <span>请添加文件</span>
      </Typography>
    );
  }
  return (
    <Stack>
      {files.map((file, index) => {
        return (
          <>
            <FileItem
              key={index}
              file={file}
              onDelete={() => onDeleteItem?.(index)}
              onPreview={() => handlePreivew(index)}
            />
            <TablePreviewDialog
              open={previewDialogOpen}
              data={currentFile}
              onClose={() => setPreviewDialogOpen(false)}
            />
          </>
        );
      })}
    </Stack>
  );
};

export default FileList;
