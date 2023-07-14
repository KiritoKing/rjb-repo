import ModelManager from "@/Components/ModelManage";
import ModelApply from "@/Components/ModelApply";
import ResultView from "@/Components/ResultView";
import { Button, IconButton, Sheet } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import SectionTitle from "@/Components/General/SectionTitle";
import _ from "lodash";
import { Link } from "react-router-dom";
import SectionCard from "@/Components/General/SectionCard";
import FileManager from "@/Components/FileManage";
import TaskManager from "@/Components/TaskManager";

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

      <SectionCard>
        <SectionTitle title="模型应用" subTitle="Model Apply" />
        <FileManager />
        <TaskManager />
      </SectionCard>
    </>
  );
};

export default Main;
