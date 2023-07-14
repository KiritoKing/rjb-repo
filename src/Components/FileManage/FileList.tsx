import { Card, IconButton, Stack, Typography } from "@mui/joy";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { FC, useMemo, useState } from "react";
import { keyframes } from "@emotion/react";
import TablePreviewDialog from "./TablePreviewDialog";
import { toast } from "sonner";

interface IItemProps {
  file: CsvFileItem;
  onDelete?: () => void;
  onPreview?: () => void;
}

interface IListProps {
  files: CsvFileItem[];
  onDeleteItem?: (index: number) => void;
}

const blink = keyframes`
  0% { border-color: #f3f3f3; } /* 边框的初始颜色 */
  50% { border-color: #3498db; } /* 边框的中间颜色 */
  100% { border-color: #f3f3f3; } /* 边框的最终颜色 */`;

const FileItem: FC<IItemProps> = ({ file, onDelete, onPreview }) => {
  const borderColor = useMemo(() => {
    switch (file.status) {
      case "error":
        return "#d63031";
      case "pending":
        return "#3498db";
      case "ok":
        return "#49996b";
      default:
        return "gray";
    }
  }, [file.status]);

  const textColor = useMemo(() => {
    switch (file.status) {
      case "error":
        return "#d63031";
      case "pending":
        return "#3498db";
      case "ok":
        return "#1c3b29";
      default:
        return "gray";
    }
  }, [file.status]);

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        mx: 2,
        mb: 1,
        flexDirection: "row",
        alignItems: "center",
        border: "2px solid",
        borderColor: borderColor,
        animation:
          file.status === "pending" ? `${blink} 2s linear infinite` : "",
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
          color: textColor,
        }}
      >
        <FilePresentIcon sx={{ mr: 1 }} />
        {file.title}
      </Typography>
      <IconButton
        onClick={onDelete}
        variant="plain"
        sx={{
          color: textColor,
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
  const [currentFile, setCurrentFile] = useState<CsvFileItem>();

  const handlePreivew = (index: number) => {
    setCurrentFile(files[index]);
    if (files[index].previewData) {
      setPreviewDialogOpen(true);
    } else {
      toast.error("预览打开失败：无数据回传");
    }
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
          <React.Fragment key={index}>
            <FileItem
              file={file}
              onDelete={() => onDeleteItem?.(index)}
              onPreview={() => handlePreivew(index)}
            />
            <TablePreviewDialog
              open={previewDialogOpen}
              data={currentFile}
              onClose={() => setPreviewDialogOpen(false)}
            />
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

export default FileList;
