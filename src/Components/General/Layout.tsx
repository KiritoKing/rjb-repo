import LoginModal from "@/Components/LoginModal";
import UserProfile from "@/Components/UserProfile";
import useGlobalState from "@/Hooks/useGlobalState";
import { Sheet } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";

const Layout = () => {
  const logIn = useGlobalState((s) => !!s.username);

  return (
    <Sheet
      sx={{
        width: "var(--card-width)",
        mx: "auto",
        py: 5,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: "transparent",
      }}
    >
      <UserProfile />
      <Outlet />
      <LoginModal
        open={!logIn}
        onLogin={(name?: string) => {
          toast.success("欢迎回来 " + name + "！");
        }}
      />
    </Sheet>
  );
};

export default Layout;
