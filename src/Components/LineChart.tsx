import useChart from "@/Hooks/useChart";
import { Sheet } from "@mui/joy";
import { FC, useEffect } from "react";

interface IProps {
  data: ITableData;
}

const LineChart: FC<IProps> = ({ data }) => {
  // TODO: 根据数据大小选择显示密度
  const [chartRef, setData] = useChart(4);

  useEffect(() => {
    console.log(data);
    setData(data);
  }, [data, setData]);

  return (
    <Sheet
      ref={chartRef}
      sx={{
        width: "100%",
        height: "400px",
        my: 2,
        borderRadius: 2,
      }}
    >
      OverviewChart
    </Sheet>
  );
};

export default LineChart;
