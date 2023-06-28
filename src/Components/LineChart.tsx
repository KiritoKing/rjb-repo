import useChart from "@/Hooks/useChart";
import { Sheet } from "@mui/joy";
import { FC, useEffect } from "react";

interface IProps {
  data: ITableData;
}

const LineChart: FC<IProps> = ({ data }) => {
  const [chartRef, setData] = useChart();

  useEffect(() => {
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
