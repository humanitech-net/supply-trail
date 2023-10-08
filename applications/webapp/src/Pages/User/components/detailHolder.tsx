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
  InputLabel,
  OutlinedInput,
  useTheme,
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
              <InputLabel>First Name</InputLabel>
              <OutlinedInput
                defaultValue={firstName}
                label="First Name"
                disabled
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                defaultValue={lastName}
                label="Last Name"
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <OutlinedInput defaultValue={email} label="Email" disabled />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Phone Number</InputLabel>
              <OutlinedInput
                defaultValue={phoneNumber}
                label="Phone Number"
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Address</InputLabel>
              <OutlinedInput defaultValue={address} label="Address" disabled />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Date of Birth</InputLabel>
              <OutlinedInput
                defaultValue={birthdate}
                label="Date of Birth"
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
