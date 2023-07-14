import ModelManager from "@/Components/ModelManage";
import ModelApply from "@/Components/ModelApply";
import ResultView from "@/Components/ResultView";
import { Button, IconButton, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import SectionTitle from "@/Components/General/SectionTitle";
import _ from "lodash";
import { Link } from "react-router-dom";
import SectionCard from "@/Components/General/SectionCard";

const Main = () => {
  return (
    <>
      <SectionCard>
        <Sheet sx={{ display: "flex", justifyContent: "space-between" }}>
          <SectionTitle title="模型管理" subTitle="Model Management" />
          <Button to="train" component={Link} startDecorator={<AddIcon />}>
            训练模型
          </Button>
        </Sheet>
        <ModelManager />
      </SectionCard>

      <ModelApply />
      <ResultView />
    </>
  );
};

export default Main;
