import useGlobalState from "@/Hooks/useGlobalState";
import {
  Avatar,
  Card,
  ListItemDecorator,
  Menu,
  MenuItem,
  Typography,
} from "@mui/joy";
import { useRef, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import useAxios from "@/Hooks/useAxios";
import { toast } from "sonner";
import useClientWidth from "@/Hooks/useClientWidth";
import { XL_BREAKPOINT } from "@/Constants/responsive";

const UserProfile = () => {
  const username = useGlobalState((s) => s.username);
  const setUsername = useGlobalState((s) => s.setUsername);
  const [, collapsed] = useClientWidth(XL_BREAKPOINT);
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, error, , fetchLogout] = useAxios<null>(
    "/user/logout",
    {
      method: "post",
    },
    (resp) => {
      if (resp.code === 0) {
        setUsername(undefined);
        window.localStorage.removeItem("user");
        toast.success("登出成功！");
      } else {
        toast.error("登出失败: " + error);
      }
    },
    (err) => {
      toast.error("登出失败: " + err.message);
    }
  );

  const handleClose = () => setMenuOpen(false);
  const handleOpen = () => setMenuOpen(true);

  return (
    <>
      <Card
        slotProps={{
          root: {
            ref: ref,
          },
        }}
        component="button"
        variant="outlined"
        onClick={handleOpen}
        sx={{
          color: "#99999",
          borderRadius: "50px",
          px: !collapsed ? 3 : 0.5,
          py: !collapsed ? 1 : 0.5,
          width: "fit-content",
          height: "fit-content",
          position: "fixed",
          right: "5%",
          ":hover": {
            cursor: "pointer",
          },
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexDirection: "row",
          zIndex: 100,
        }}
      >
        <Avatar size="sm" />
        {!collapsed && <Typography component="span">{username}</Typography>}
      </Card>
      <Menu open={menuOpen} onClose={handleClose} anchorEl={ref.current}>
        <MenuItem onClick={() => fetchLogout()}>
          <ListItemDecorator>
            <LogoutIcon />
          </ListItemDecorator>
          登出
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;
