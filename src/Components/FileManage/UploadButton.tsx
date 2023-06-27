import { Button, FormControl, FormLabel, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";

interface IProps {
  onUpload?: (file: File) => void;
}

const FileInput: FC<{ onChange?: (file: File) => void }> = ({ onChange }) => (
  <input
    onChange={(e) => {
      if (e.target.files && e.target.files.length > 0)
        onChange?.(e.target.files[0]);
      e.target.value = "";
    }}
    name="file"
    type="file"
    id="file-upload"
    accept=".csv"
    hidden
  />
);

const UploadButton: FC<IProps> = ({ onUpload }) => {
  return (
    <Sheet>
      <FormControl sx={{ py: "auto", my: "auto" }}>
        <FormLabel
          slotProps={{
            root: {
              htmlFor: "file-upload",
            },
          }}
        >
          <Button
            sx={{ height: "1rem" }}
            component="a"
            startDecorator={<AddIcon />}
          >
            上传文件
          </Button>
        </FormLabel>
        <FileInput onChange={onUpload} />
      </FormControl>
    </Sheet>
  );
};

export default UploadButton;
