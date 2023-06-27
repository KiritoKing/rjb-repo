import LoginModal from "@/Components/LoginModal";
import ModelManage from "@/Components/ModalManage";
import ModelApply from "@/Components/ModelApply";
import ResultView from "@/Components/ResultView";
import UserProfile from "@/Components/UserProfile";
import useLogin from "@/Hooks/useLogin";
import { Sheet } from "@mui/joy";

const Main = () => {
  const [logIn, setLogIn] = useLogin();

  return (
    <Sheet
      sx={{
        width: "60%",
        mx: "auto",
        my: 5,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <UserProfile />
      <ModelManage />
      <ModelApply />
      <ResultView />
      <LoginModal open={!logIn} onLogin={() => setLogIn(true)} />
    </Sheet>
  );
};

export default Main;
