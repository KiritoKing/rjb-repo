import { useEffect, useState } from "react";
import _ from "lodash";

interface IOption {
  dillema?: string; // 分隔符
  withColumn?: boolean; // 第一行默认为列名
}

async function readCsv(file: Blob, dillema = ","): Promise<ITableData | null> {
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      if (reader.result === null) resolve(null);
      const text = reader.result as string;
      const lines = text
        .split("\n")
        .map((line) => line.trim().replace(/"/g, "")); // 去除CRLF行尾
      const columns = lines[0].split(dillema);
      const data = lines
        .slice(1)
        .map((line) => line.split(dillema))
        .filter((line) => line.length === columns.length); // 过滤不合格数据
      resolve({ columns, data });
    };
    reader.onerror = reject;
  });
}

export default function useCsv(
  files: IFileInfo[],
  options: IOption = {
    dillema: ",",
    withColumn: true,
  }
) {
  const { withColumn, dillema } = options;
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
      readCsv(file.blob, dillema)
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
          console.warn(`[useCsv] Read csv error: ${err}`);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, withColumn, dillema]);

  return [data, error] as [ITableData, number[]];
}
