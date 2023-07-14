type TableRow = (string | number)[];

interface ITableData {
  columns?: string[];
  data: TableRow[];
}

interface CsvFileItem {
  title: string;
  id?: string;
  status: "ok" | "error" | "pending";
  blob: Blob;
  previewData?: ITableData;
}
