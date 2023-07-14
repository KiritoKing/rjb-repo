import { Button, IconButton, Sheet } from "@mui/joy";
import ModelList from "./ModelList";
import SectionCard from "../General/SectionCard";
import SectionTitle from "../General/SectionTitle";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import _ from "lodash";
import useLoadData from "@/Hooks/useLoadData";
import { useEffect } from "react";
import LoadingScreen from "../General/LoadingScreen";

const PAGE_SIZE = 10;

const ModelManager = () => {
  const [models, loading, fetchModel] = useLoadData<IModelInfo[]>(
    "/model/list",
    {
      params: {
        pageNum: 0,
        pageSize: PAGE_SIZE,
      },
      successText: "获取模型列表成功",
      errorText: "获取模型列表失败",
    }
  );

  return (
    <Sheet sx={{ px: 2, my: 2 }}>
      <Sheet sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <IconButton onClick={() => _.throttle(fetchModel)()} variant="plain">
          <RefreshIcon />
        </IconButton>
      </Sheet>
      <LoadingScreen loading={loading}>
        <ModelList options={models} />
      </LoadingScreen>
    </Sheet>
  );
};

export default ModelManager;
