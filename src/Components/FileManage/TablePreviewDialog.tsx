import React, { useMemo } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import { ModalClose, Table } from "@mui/joy";
import useCsv from "@/Hooks/useCsv";

interface IProps {
  open: boolean;
  data?: CsvFileItem;
  onClose?: () => void;
}

const TablePreviewDialog: React.FC<IProps> = ({ open, onClose, data }) => {
  const { previewData } = data ?? {};

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          transition: "opacity 0.3s, visibility 0s 0.3s",
          overflow: "hidden",
        }}
      >
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
            overflow: "scroll",
          }}
        >
          <Table stickyHeader size="sm">
            <caption>{data?.title} 数据预览（前100条数据）</caption>
            <thead>
              <tr>
                {previewData?.columns?.map((column, i) => (
                  <th key={i}>{column}</th>
                ))}
              </tr>
              {previewData?.data.slice(0, 100).map((row, i) => {
                return (
                  <tr key={i}>
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
