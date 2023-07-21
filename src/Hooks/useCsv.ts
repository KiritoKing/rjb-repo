import { useEffect, useState } from "react";
import _ from "lodash";

interface IOption {
  dilemma?: string; // 分隔符
  withColumn?: boolean; // 第一行默认为列名
}

function extractColumns(line: string): string[] {
  const columnNames = [];
  let columnName = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      // 处理双引号
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      // 处理逗号（仅在不在双引号内时）
      columnNames.push(columnName.trim());
      columnName = "";
    } else {
      // 添加字符到列名
      columnName += char;
    }
  }

  // 添加最后一个列名
  columnNames.push(columnName.trim());

  return columnNames;
}

async function readCsv(file: Blob, dilemma = ","): Promise<ITableData | null> {
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      if (reader.result === null) resolve(null);
      const text = reader.result as string;
      const lines = text
        .split("\n")
        .map((line) => line.trim().replace(/"/g, "")); // 去除CRLF行尾
      const columns = extractColumns(lines[0]);
      const data = lines
        .slice(1)
        .map((line) => line.split(dilemma))
        .filter((line) => line.length === columns.length); // 过滤不合格数据
      resolve({ columns, data });
    };
    reader.onerror = reject;
  });
}

/**
 * 用于解析csv文件为表格数据
 * @param files csv文件
 * @param options 解析选项，包括分隔符和是否解析首行
 * @returns [data, error]: data-解析后的表格数据，error-发生错误的行索引
 */
export default function useCsv(
  files: CsvFileItem[],
  options: IOption = {
    dilemma: ",",
    withColumn: true,
  }
) {
  const { withColumn, dilemma: dilemma } = options;
  const [data, setData] = useState<ITableData>({
    columns: withColumn ? [] : undefined,
    data: [],
  });
  const [error, setError] = useState<number[]>([]);

  const pushData = ({ columns, data: newData }: ITableData) => {
    setData((old) => {
      return {
        columns: withColumn ? columns : undefined,
        data: [...old.data, ...newData],
      };
    });
  };
  const clearData = () => {
    setData({
      columns: withColumn ? [] : undefined,
      data: [],
    });
  };

  useEffect(() => {
    clearData();
    files.forEach((file, index) => {
      readCsv(file.blob, dilemma)
        .then((res) => {
          if (res === null) return;
          // 没有列冲突时直接push
          if (!data.columns || data.columns.length === 0) {
            pushData(res);
          } else if (_.isEqual(res.columns, data.columns)) {
            pushData(res);
          } else {
            setError((old) => [...old, index]); // 当发生错误时写入错误索引
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(`[useCsv] Read csv error: ${err}`);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, withColumn, dilemma]);

  return [data, error] as [ITableData, number[]];
}
