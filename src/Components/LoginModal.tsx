import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import { Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";

interface IProps {
  open: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
}

const LoginModal: React.FC<IProps> = ({ open, onLogin }) => {
  return (
    <Modal open={open}>
      <ModalDialog>
        <Sheet
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
            <Input name="username" type="text" placeholder="请输入用户名" />
          </FormControl>
          <FormControl>
            <FormLabel>密码</FormLabel>
            <Input name="password" type="password" placeholder="请输入密码" />
          </FormControl>
          <Sheet
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button onClick={onLogin}>登录</Button>
            <Button>注册</Button>
          </Sheet>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default LoginModal;
