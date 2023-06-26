import LoginModal from "@/Components/LoginModal";
import ModelManage from "@/Components/ModalManage";
import ModelApply from "@/Components/ModelApply";
import UserProfile from "@/Components/UserProfile";
import useLogin from "@/Hooks/useLogin";
import { Button, Sheet } from "@mui/joy";
import { useState } from "react";

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
      <LoginModal open={!logIn} onLogin={() => setLogIn(true)} />
    </Sheet>
  );
};

export default Main;
