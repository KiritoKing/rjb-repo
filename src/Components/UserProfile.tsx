import { Card } from "@mui/joy";

const UserProfile = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        color: "#99999",
        borderRadius: "5px",
        px: 2,
        py: 0.8,
        width: "fit-content",
        height: "fit-content",
        position: "fixed",
        right: "5%",
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      User
    </Card>
  );
};

export default UserProfile;
