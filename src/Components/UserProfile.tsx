import useGlobalState from "@/Hooks/useGlobalState";
import { Avatar, Card, Typography } from "@mui/joy";

const UserProfile = () => {
  const username = useGlobalState((s) => s.username);

  return (
    <Card
      component="button"
      variant="outlined"
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
  );
};

export default UserProfile;
