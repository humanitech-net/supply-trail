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
import { Container, Typography } from "@mui/material";

export default function KeycloakError() {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <Container maxWidth={false} disableGutters sx={style}>
      <Typography variant="h4" fontWeight={"bold"}>
        Internal Server Error
      </Typography>
      <Typography variant="subtitle2">
        An error occurred during keycloak initialization
      </Typography>
    </Container>
  );
}
