import useChart from "@/Hooks/useChart";
import { Sheet, Typography } from "@mui/joy";
import { FC, useEffect } from "react";

interface IProps {
  data: ITableData;
  rawLength?: number;
}

const LineChart: FC<IProps> = ({ data, rawLength }) => {
  // TODO: 根据数据大小选择显示密度
  const [chartRef, setData] = useChart(1);

  useEffect(() => {
    setData(data, rawLength);
  }, [data, rawLength, setData]);

  return (
    <>
      <Sheet
        ref={chartRef}
        sx={{
          display: data.data?.length > 0 ? "block" : "none",
          width: "100%",
          height: "30rem",
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
