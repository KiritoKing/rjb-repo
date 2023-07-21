import TablePreviewDialog from "@/Components/FileManage/TablePreviewDialog";
import SectionCard from "@/Components/General/SectionCard";
import LineChart from "@/Components/LineChart";
import useCsv from "@/Hooks/useCsv";
import { Button, Stack } from "@mui/joy";
import React, { useEffect, useState } from "react";

const Chart = () => {
  const [file, setFile] = useState<CsvFileItem>();
  const [table, error, parse] = useCsv(file ? [file] : []);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (file) {
      const { columns, data } = table;
      setFile((file) => {
        if (!file) return;
        file.previewData = {
          columns,
          data: data.slice(0, 100),
        };
        file.status = "ok";
        return file;
      });
    }
  }, [table]);

  return (
    <SectionCard>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <div>
          <span>
            Current File: {file?.title} / {file?.status}
          </span>
          <Button
            onClick={() => {
              if (file) parse();
            }}
            sx={{ ml: 2 }}
          >
            解析
          </Button>
          <Button
            onClick={() => {
              setPreviewOpen(true);
            }}
            sx={{ ml: 2 }}
          >
            预览
          </Button>
        </div>
        <div>CSV Parse Error Lines: {JSON.stringify(error)}</div>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFile({
              title: file.name,
              blob: file,
              status: "pending",
            });
          }}
        />
        <LineChart data={table} />
      </Stack>
      <TablePreviewDialog
        open={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
        }}
        data={file}
      />
    </SectionCard>
  );
};

export default Chart;
