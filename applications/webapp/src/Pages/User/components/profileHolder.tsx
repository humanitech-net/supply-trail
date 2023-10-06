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
import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";

export default function ProfileHolder() {
  return (
    <Card
      elevation={4}
      sx={{
        height: "300px",
      }}
    >
      <CardContent>
        <Avatar alt="user" src="" sx={{ width: 70, height: 70 }} />
        <Typography variant="h6">User</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima velit
          delectus cum
        </Typography>
        <Typography>Addis Ababa</Typography>
        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
