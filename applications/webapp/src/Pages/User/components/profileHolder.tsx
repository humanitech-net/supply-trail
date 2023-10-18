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
import {
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import { styles } from "../styles/style";
import { ProfileHolderProps } from "../../../Pages/interface";

export default function ProfileHolder({
  username,
  description,
  editUser,
}: Readonly<ProfileHolderProps>) {
  const theme = useTheme();
  const style = styles(theme).profileholder;

  return (
    <Card elevation={0} sx={style.card}>
      <CardContent>
        <Box sx={style.box}>
          <Grid container spacing={1} xs={14} sx={style.grid}>
            <Grid item xs={10} sx={style.grid}>
              <Avatar alt="user" src="" sx={style.avatar} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">{username}</Typography>
            </Grid>
            <Grid item xs={10} sx={style.grid}>
              <Typography>{description}</Typography>
            </Grid>
            <Grid item xs={10} md={10}>
              <Button
                aria-label="edit user"
                variant="contained"
                color="primary"
                onClick={editUser}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
