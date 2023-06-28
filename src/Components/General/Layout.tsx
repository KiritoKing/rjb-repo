import LoginModal from "@/Components/LoginModal";
import UserProfile from "@/Components/UserProfile";
import useLogin from "@/Hooks/useLogin";
import { Sheet } from "@mui/joy";
import { Outlet } from "react-router-dom";

const Layout = () => {
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
        backgroundColor: "transparent",
      }}
    >
      <UserProfile />
      <Outlet />
      <LoginModal open={!logIn} onLogin={() => setLogIn(true)} />
    </Sheet>
  );
};

export default Layout;
