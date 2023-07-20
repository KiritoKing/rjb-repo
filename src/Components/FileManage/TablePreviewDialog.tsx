import React, { useMemo } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import { ModalClose, Table } from "@mui/joy";
import useCsv from "@/Hooks/useCsv";
import AnimatedModal from "../General/AnimatedModal";

interface IProps {
  open: boolean;
  data?: CsvFileItem;
  onClose?: () => void;
}

const TablePreviewDialog: React.FC<IProps> = ({ open, onClose, data }) => {
  const { previewData } = data ?? {};

  return (
    <AnimatedModal open={open} onClose={onClose}>
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
    </AnimatedModal>
  );
};

export default TablePreviewDialog;
