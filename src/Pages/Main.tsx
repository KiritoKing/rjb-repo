import ModelManage from "@/Components/ModelManage";
import ModelApply from "@/Components/ModelApply";
import ResultView from "@/Components/ResultView";
import { useState } from "react";

const Main = () => {
  const [files, setFiles] = useState<IFileInfo[]>([]);

  return (
    <>
      <ModelManage />
      <ModelApply />
      <ResultView />
    </>
  );
};

export default Main;
