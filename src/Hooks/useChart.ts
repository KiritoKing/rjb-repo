import * as echarts from "echarts";
import _ from "lodash";
import { useCallback, useEffect, useRef } from "react";

const DATA_DENSITY = 50; // 数据密度，即每多少px显示一个数据

const basicOption: echarts.EChartsOption = {
  legend: {
    type: "scroll",
  },
  tooltip: {
    trigger: "axis",
  },
  toolbox: {
    orient: "vertical",
    top: 30,
    feature: {
      dataZoom: {},
      saveAsImage: {
        name: `chart-${new Date().toLocaleString()}`,
      },
    },
  },
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
    chart.current = echarts.init(ref.current);
    // 响应窗口大小变化
    window.addEventListener("resize", () => {
      const fn = _.debounce(() => chart.current?.resize(), 100);
      fn();
    }); // 响应容器大小变化
    chart.current.setOption({
      ...basicOption,
    });
    return () => {
      if (ref.current) {
        echarts.dispose(ref.current); // 先释放之前的内容
      }
    };
  }, []);

  // 响应容器大小变化
  useEffect(() => {
    if (!chart.current) return;
    chart.current.resize();
  }, [ref.current?.clientWidth, ref.current?.clientHeight]);

  const setData = useCallback(
    (data: ITableData, rawLength?: number) => {
      if (!ref.current || !chart.current || !data.columns) return;
      const sampledData = [
        data.columns,
        ...data.data
          .filter((_, i) => i % density === 0)
          .map((row) => {
            return row.map((cell, index) =>
              index === 0 ? cell : Number(cell)
            );
          }),
      ];
      const seriesType: echarts.SeriesOption[] = data.columns
        .slice(1)
        .map(() => ({
          type: "line",
          symbol: "none",
          markLine: {
            symbol: ["none", "none"],
            label: { show: false },
            data: [{ xAxis: rawLength }],
          },
          markArea: {
            silent: true,
            itemStyle: {
              opacity: 0.3,
              color: "#ffee6f",
            },
            data: [[{ xAxis: rawLength }, { xAxis: data.data.length }]],
          },
        }));
      const option: echarts.EChartsOption = {
        ...basicOption,
        dataset: {
          source: sampledData,
        },
        xAxis: { type: "category" }, // 第一列为横坐标
        yAxis: {},
        series: seriesType,
        dataZoom: [
          {
            type: "inside",
            start: 90,
            end: 100,
          },
          {
            start: 90,
            end: 100,
          },
        ],
      };
      chart.current.setOption(option);
      chart.current.resize();
    },
    [density]
  );

  return [ref, setData] as const;
}
