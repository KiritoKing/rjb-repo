import { Card, IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FC } from "react";

interface IItemProps {
  file: IFileInfo;
  onDelete?: () => void;
}

interface IListProps {
  files: IFileInfo[];
  onDeleteItem?: (index: number) => void;
}

const FileItem: FC<IItemProps> = ({ file, onDelete }) => {
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
        level="body2"
        component="span"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          px: 1,
          flex: 1,
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
          <FileItem
            key={index}
            file={file}
            onDelete={() => onDeleteItem?.(index)}
          />
        );
      })}
    </Stack>
  );
};

export default FileList;
