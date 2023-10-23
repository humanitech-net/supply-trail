/**
 * Humanitech Supply Trail
 *
 * Copyright (c) Humanitech, Peter Rogov and Contributors
 *
 * Website: https://humanitech.net
 * Repository: https://github.com/humanitech-net/supply-trail
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Theme } from "@mui/material/styles";

const minGap: number = 1;
const maxGap: number = 2;

export const EditableCardElevation = 5;

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
    box: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "1em",
      width: "100%",
    },
    buttonHolder: {
      display: "flex",
      justifyContent: "space-evenly",
      width: ["100%", "100%", "40%"],
    },
    card: {
      height: "310px",
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
      gap: [minGap, minGap, maxGap],
      width: ["100%", "100%", "30%"],
      margin: ["0 0 20px", "0 0 20px", "0 20px 0 0"],
    },
    DetailHolderContainer: {
      display: "grid",
      gridTemplateRows: ["auto", "auto", "repeat(2, 0.2fr)"],
      gap: [minGap, minGap, maxGap],
      width: ["100%", "100%", "70%"],
    },
  },
});
