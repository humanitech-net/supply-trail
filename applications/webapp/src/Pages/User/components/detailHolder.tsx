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
  Card,
  CardContent,
  FormControl,
  Grid,
  useTheme,
  TextField,
} from "@mui/material";
import { styles } from "../styles/style";

interface DetailHolderProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthdate: string;
}

export default function DetailHolder({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  birthdate,
}: DetailHolderProps) {
  const theme = useTheme();
  const style = styles(theme).detailHolder;
  return (
    <Card elevation={0} sx={style.card}>
      <CardContent>
        <Grid container spacing={2} marginTop={1} sx={style.grid}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField label="First Name" defaultValue={firstName} disabled />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField label="Last Name" disabled defaultValue={lastName} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={style.grid}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField label="Email" defaultValue={email} disabled />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Phone Number"
                defaultValue={phoneNumber}
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField label="Address" defaultValue={address} disabled />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Date of Birth"
                defaultValue={birthdate}
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
