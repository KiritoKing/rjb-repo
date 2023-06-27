import React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  Typography,
} from "@mui/joy";

type TableUnitDataType = number | string | null;

interface IProps {
  open: boolean;
  data?: IFileInfo;
  onClose?: () => void;
}

const TablePreviewDialog: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Sheet
          component="form"
          sx={{
            minWidth: "50vw",
            minHeight: "30vh",
            mx: 5,
            my: 4, // margin top & bottom
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>表格数据预览</Typography>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default TablePreviewDialog;
