import React, { useMemo } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  Table,
  Typography,
} from "@mui/joy";
import useCsv from "@/Hooks/useCsv";

type TableUnitDataType = number | string | null;

interface IProps {
  open: boolean;
  data?: IFileInfo;
  onClose?: () => void;
}

const TablePreviewDialog: React.FC<IProps> = ({ open, onClose, data }) => {
  const tmp = useMemo(() => {
    if (data) return [data];
    else return [];
  }, [data]);
  const [csvData] = useCsv(tmp);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ transition: "opacity 0.3s, visibility 0s 0.3s" }}>
        <ModalClose />
        <Sheet
          component="form"
          sx={{
            minWidth: "80vw",
            minHeight: "30vh",
            mx: 5,
            my: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowX: "scroll",
          }}
        >
          <Table stickyHeader size="sm">
            <caption>{data?.title} 数据预览（前100条数据）</caption>
            <thead>
              <tr>
                {csvData.columns?.map((column) => (
                  <th>{column}</th>
                ))}
              </tr>
              {csvData.data.slice(0, 100).map((row) => {
                return (
                  <tr>
                    {row.map((cell) => (
                      <td>{cell}</td>
                    ))}
                  </tr>
                );
              })}
            </thead>
          </Table>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default TablePreviewDialog;
