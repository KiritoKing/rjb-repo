import { Button, IconButton, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import ModelList from "./ModelList";
import SectionCard from "../General/SectionCard";
import SectionTitle from "../General/SectionTitle";
import { Link } from "react-router-dom";
import useApi from "@/Hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "sonner";
import _ from "lodash";

const PAGE_SIZE = 10;

const ModelManage = () => {
  const modelApi = useApi("/model");
  const [models, setModels] = useState<IModelInfo[]>([]);

  const handleRefresh = useCallback(
    async (onLoad = false, page = 0, pageSize = PAGE_SIZE) => {
      const { status, data: resp } = await modelApi.get<
        AxiosResponse<IModelInfo[]>
      >("/list", {
        params: { pageNum: page, pageSize },
      });
      if (status === 200) {
        const { code, data, msg } = resp;
        if (code === 0) {
          setModels(data);
          if (!onLoad) toast.success("刷新成功");
        } else {
          toast.error(msg ?? "刷新失败");
        }
      }
    },
    [modelApi]
  );

  useEffect(() => {
    handleRefresh(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionCard>
      <Sheet sx={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle title="模型管理" subTitle="Model Mangement" />
        <Sheet sx={{ display: "flex", gap: 2 }}>
          <IconButton
            onClick={() => _.throttle(handleRefresh)()}
            variant="plain"
          >
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
