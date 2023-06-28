import SectionCard from "@/Components/General/SectionCard";
import SectionTitle from "@/Components/General/SectionTitle";
import { IconButton, Sheet } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ModelInfo from "@/Components/ModelInfo";
import FileUpload from "@/Components/FileManage/FileUpload";

const Train = () => {
  const nav = useNavigate();
  const handleBack = () => {
    nav(-1);
  };

  return (
    <SectionCard>
      <Sheet sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <IconButton
          onClick={handleBack}
          variant="outlined"
          sx={{
            color: "black",
            borderColor: "gray",
            ":hover": { backgroundColor: "#efefef", borderColor: "gray" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <SectionTitle title="训练模型" subTitle="Train Model" />
      </Sheet>
      <ModelInfo />
      <FileUpload />
    </SectionCard>
  );
};

export default Train;
