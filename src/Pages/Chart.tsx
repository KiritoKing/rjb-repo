import TablePreviewDialog from "@/Components/FileManage/TablePreviewDialog";
import SectionCard from "@/Components/General/SectionCard";
import LineChart from "@/Components/LineChart";
import useCsv from "@/Hooks/useCsv";
import useGlobalState from "@/Hooks/useGlobalState";
import { Button, Stack } from "@mui/joy";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

function generateFakeData(columns: string[], rows: number): ITableData {
  const ans: ITableData = {
    columns,
    data: [],
  };
  const stamp = dayjs().valueOf() - rows * 1000;
  for (let i = 0; i < rows; i++) {
    const data: TableRow = [
      dayjs(stamp + i * 1000).format("YYYY-MM-DD HH:mm:ss"),
    ];
    for (let j = 0; j < columns.length - 1; j++) {
      data.push(Math.random() * 10000);
    }
    ans.data.push(data);
  }
  return ans;
}

const Chart = () => {
  const [file, setFile] = useState<CsvFileItem>();
  const [table, error, parse, pushItem] = useCsv(file ? [file] : []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const rawLength = useGlobalState((s) => s.rawDataLength);
  const setTable = useGlobalState((s) => s.setTableData);

  useEffect(() => {
    console.log(rawLength);
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
          <Button
            sx={{ ml: 2 }}
            onClick={() => {
              if (!table.columns) return;
              const tmp = generateFakeData(table.columns, 1000);
              pushItem(tmp);
            }}
          >
            添加数据
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
        <LineChart data={table} rawLength={23000} />
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
