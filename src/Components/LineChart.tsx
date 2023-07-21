import useChart from "@/Hooks/useChart";
import { Sheet, Typography } from "@mui/joy";
import { FC, useEffect } from "react";

interface IProps {
  data: ITableData;
}

const LineChart: FC<IProps> = ({ data }) => {
  // TODO: 根据数据大小选择显示密度
  const [chartRef, setData] = useChart(4);

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  return (
    <>
      <Sheet
        ref={chartRef}
        sx={{
          display: data.data?.length > 0 ? "block" : "none",
          width: "100%",
          height: "25rem",
          my: 2,
          borderRadius: 2,
        }}
      >
        OverviewChart
      </Sheet>
      <Sheet
        sx={{
          display: data.data.length > 0 ? "none" : "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ py: 8 }}>暂无数据 :（</Typography>
      </Sheet>
    </>
  );
};

export default LineChart;
