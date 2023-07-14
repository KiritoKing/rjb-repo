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

const UserProfile = () => {
  const username = useGlobalState((s) => s.username);
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
          px: 3,
          py: 1,
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
        }}
      >
        <Avatar size="sm" />
        <Typography component="span">{username}</Typography>
      </Card>
      <Menu open={menuOpen} onClose={handleClose} anchorEl={ref.current}>
        <MenuItem onClick={handleClose}>
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
