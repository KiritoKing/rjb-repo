import { Button, IconButton, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import ModelList from "./ModelList";
import SectionCard from "../General/SectionCard";
import SectionTitle from "../General/SectionTitle";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import _ from "lodash";
import useLoadData from "@/Hooks/useLoadData";

const PAGE_SIZE = 10;

const ModelManage = () => {
  const [models, loading, fetchModel] = useLoadData<IModelInfo[]>(
    "/model/list",
    {
      params: {
        pageNum: 0,
        pageSize: PAGE_SIZE,
      },
      successText: "获取模型列表成功",
      errorText: "获取模型列表失败",
      autoLoad: true,
    }
  );

  return (
    <SectionCard>
      <Sheet sx={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle title="模型管理" subTitle="Model Mangement" />
        <Sheet sx={{ display: "flex", gap: 2 }}>
          <IconButton onClick={() => _.throttle(fetchModel)()} variant="plain">
            <RefreshIcon />
          </IconButton>
          <Button to="train" component={Link} startDecorator={<AddIcon />}>
            训练模型
          </Button>
        </Sheet>
      </Sheet>
      <Sheet sx={{ px: 2, my: 2 }}>
        <ModelList options={models} />
      </Sheet>
    </SectionCard>
  );
};

export default ModelManage;
