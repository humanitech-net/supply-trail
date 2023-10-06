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

import React from "react";
import { Box, Card } from "@mui/material";
import ProfileHolder from "./components/profileHolder";
import DetailHolder from "./components/detailHolder";

export default function UserPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row"],
        width: "100%",
        height: "86vh",
        margin: "75px 30px 0 30px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: ["auto", "auto", "repeat(2, 0.2fr)"],
          gap: [1, 1, 2],
          width: ["100%", "100%", "30%"],
          margin: ["0 0 20px", "0 0 20px", "0 20px 0 0"],
        }}
      >
        <ProfileHolder />
        <Card sx={{ height: "200px" }}>empty one</Card>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: ["1fr", "auto", "repeat(2, 0.2fr)"],
          gap: [1, 1, 2],
          width: ["100%", "100%", "70%"],
        }}
      >
        <DetailHolder />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "auto", "repeat(2, 1fr)"],
            gap: [1, 1, 2],
            height: "180px",
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            empty two
          </Card>
          <Card sx={{ height: "100%" }}>empty three</Card>
        </Box>
      </Box>
    </Box>
  );
}
