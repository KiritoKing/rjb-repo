import { SeriesOption } from "echarts";
import { useMemo } from "react";

export default function useSeriesData(rawData: ITableData) {
  return useMemo(() => {
    const transposed = [];
    const colLen = rawData.columns?.length ?? rawData.data[0].length;
    const rowLen = rawData.data.length;
    for (let i = 0; i < colLen; i++) {
      const name = rawData.columns?.[i] ?? i.toString();
      const data = [];
      for (let j = 0; j < rowLen; j++) {
        if (Number.isNaN(rawData.data[j][i])) break;
        data.push(Number(rawData.data[j][i]));
      }
      if (data.length === 0) continue;
      transposed.push({ name, data, type: "line" });
    }
    return transposed as SeriesOption[];
  }, [rawData]);
}
