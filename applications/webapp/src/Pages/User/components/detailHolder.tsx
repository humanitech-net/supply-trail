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

import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  useTheme,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { styles } from "../util/style";
import { useMutation } from "@apollo/client";
import { EditUserMutation } from "../../../hooks/mutation";
import { useCardContext, useUserContext } from "../context";
import { Link } from "react-router-dom";
import { CHANGE_PASSWORD_URL } from "../util/constants";

export default function DetailHolder() {
  const theme = useTheme();
  const style = styles(theme).detailHolder;

  const { user } = useUserContext();
  const { firstName, lastName, email, address, birthdate, phoneNumber } = user;

  const card = useCardContext();
  const { editable, setEditable, setElevation } = card;

  const [firstname, setFirstname] = useState(firstName);

  const [lastname, setLastname] = useState(lastName);

  const [editUser] = useMutation(EditUserMutation);

  async function updateUser() {
    try {
      const { data } = await editUser({
        variables: {
          firstname,
          lastname,
        },
      });
      console.log("User:", data.editUser);
    } catch (error) {
      console.error("Error:", error);
    }
    setEditable(!editable);
    setElevation(0);
  }

  function firstNameChanged(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    return setFirstname(event.target.value);
  }

  function lastNameChanged(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    return setLastname(event.target.value);
  }

  return (
    <Card elevation={card.elevation} sx={style.card}>
      <CardContent>
        <Grid container spacing={2} marginTop={1} sx={style.grid}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="First Name"
                defaultValue={firstName}
                disabled={editable}
                onChange={firstNameChanged}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Last Name"
                disabled={editable}
                defaultValue={lastName}
                onChange={lastNameChanged}
              />
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
        {!card.editable && (
          <Box sx={style.box}>
            <Box sx={style.buttonHolder}>
              <Button variant="contained" onClick={updateUser}>
                Update
              </Button>
              <Link to={CHANGE_PASSWORD_URL}>
                <Button variant="contained" color="warning">
                  Change Password
                </Button>
              </Link>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
