import { Theme } from "@mui/material/styles";

export const styles = (theme: Theme) => ({
  profileholder: {
    box: {
      flexGrow: 1,
    },
    grid: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "auto",
    },
    card: {
      height: "300px",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      },
    },
    avatar: {
      width: 120,
      height: 120,
    },
  },

  detailHolder: {
    card: {
      height: "260px",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      },
      overflowX: "hidden",
    },

    grid: {
      marginBottom: "1rem",
    },
  },

  userPage: {
    userPageContainer: {
      display: "flex",
      flexDirection: ["column", "column", "row"],
      margin: "0 20px 0 20px",
    },
    profilePageHolder: {
      display: "grid",
      gridTemplateRows: ["auto", "auto", "repeat(2, 0.2fr)"],
      gap: [1, 1, 2],
      width: ["100%", "100%", "30%"],
      margin: ["0 0 20px", "0 0 20px", "0 20px 0 0"],
    },
    DetailHolderContainer: {
      display: "grid",
      gridTemplateRows: ["auto", "auto", "repeat(2, 0.2fr)"],
      gap: [1, 1, 2],
      width: ["100%", "100%", "70%"],
    },
  },
});
