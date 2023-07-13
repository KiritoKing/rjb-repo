import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import FileUpload from "./FileManage/FileUpload";
import TaskManager from "./TaskManager";

const TaskCombination = () => {
  const [csvFiles, setCsvFiles] = useState<IFileInfo[]>([]);

  return (
    <Sheet>
      <FileUpload />
      <TaskManager />
    </Sheet>
  );
};

export default TaskCombination;
