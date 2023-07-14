import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import { Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useAxios from "@/Hooks/useAxios";
import useGlobalState from "@/Hooks/useGlobalState";

interface IProps {
  open: boolean;
  onLogin?: (username?: string) => void;
  onRegister?: () => void;
}

const LoginModal: React.FC<IProps> = ({ open, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setGlobalUsername = useGlobalState((state) => state.setUsername);
  const [, error, loading, fetchLogin] = useAxios<string>(
    "/user/login",
    {
      method: "post",
      data: { username, password },
    },
    (resp) => {
      onLogin?.(resp.data);
      setGlobalUsername(resp.data ?? "User");
    }
  );

  const handleLogin = () => {
    if (username === "local") {
      onLogin?.(username);
      setGlobalUsername(username);
      return;
    }
    fetchLogin();
  };

  return (
    <Modal open={open}>
      <ModalDialog>
        <Sheet
          component="form"
          sx={{
            minWidth: 400,
            mx: 5,
            my: 4, // margin top & bottom
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Sheet sx={{ mb: 2 }}>
            <Typography level="h4" component="h1">
              欢迎来到模型可视化平台
            </Typography>
            <Typography level="body2">您需要登录才能继续操作</Typography>
          </Sheet>
          <FormControl>
            <FormLabel>用户名</FormLabel>
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              name="username"
              type="text"
              placeholder="请输入用户名"
            />
          </FormControl>
          <FormControl>
            <FormLabel>密码</FormLabel>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </FormControl>
          {error && (
            <Typography
              color="danger"
              level="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ErrorOutlineIcon sx={{ mr: 1 }} />
              {error}
            </Typography>
          )}
          <Sheet
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button disabled={loading} onClick={handleLogin}>
              登录
            </Button>
            <Button>注册</Button>
          </Sheet>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default LoginModal;
