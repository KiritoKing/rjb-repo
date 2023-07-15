import * as echarts from "echarts";
import _ from "lodash";
import { useCallback, useEffect, useRef } from "react";

const DATA_DENSITY = 50; // 数据密度，即每多少px显示一个数据

const basicOption: echarts.EChartsOption = {
  // title: {
  //   text: "数据预览",
  // },
  // tooltip: {
  //   trigger: "axis",
  // },
};

/**
 * 初始化echarts图表，暴露出ref和setData
 * @returns [ref, setData]: ref-绑定到chart容器DOM上，setData-设置chart的数据
 */
export default function useChart(density: number = DATA_DENSITY) {
  const ref = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>();
  // 初始化chart
  useEffect(() => {
    if (!ref.current) return;
    echarts.dispose(ref.current); // 先释放之前的内容
    chart.current = echarts.init(ref.current);
    window.addEventListener("resize", () => {
      const fn = _.debounce(() => chart.current?.resize(), 100);
      fn();
    }); // 响应容器大小变化
    chart.current.setOption({
      ...basicOption,
    });
  }, []);
  useEffect(() => {
    if (!chart.current) return;
    chart.current.resize();
  }, [ref.current?.clientWidth, ref.current?.clientHeight]);

  const setData = useCallback((data: ITableData) => {
    if (!ref.current || !chart.current || !data.columns) return;
    // const sampleNum = Number(
    //   (ref.current.clientWidth / DATA_DENSITY).toFixed()
    // ); // 代表需要多少个数据点
    // console.log(
    //   `PointNum=${ref.current.clientWidth}/${DATA_DENSITY}=${sampleNum}`
    // );
    const sampledData = [
      data.columns,
      ...data.data
        .filter((_, i) => i % density === 0)
        .map((row) => {
          return row.map((cell, index) => (index === 0 ? cell : Number(cell)));
        }),
    ];
    const seriesType: echarts.SeriesOption[] = data.columns.map(() => ({
      type: "line",
    }));
    const option: echarts.EChartsOption = {
      ...basicOption,
      legend: {},
      dataset: {
        source: sampledData,
      },
      xAxis: { type: "category" }, // 第一列为横坐标
      yAxis: {},
      series: seriesType,
    };
    chart.current.setOption(option);
  }, []);

  return [ref, setData] as const;
}
