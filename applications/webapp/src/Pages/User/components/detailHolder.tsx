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
  Grid,
  useTheme,
  // TextField,
  Button,
  Box,
} from "@mui/material";
import { styles } from "../util/style";
import { useCardContext, useUserContext } from "../context";
import { Link } from "react-router-dom";
import { CHANGE_PASSWORD_URL, fields } from "../util/constants";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { UserDetailGridItem } from "./userDetailHolderGridItem";
import { User } from "../../interface";

export default function DetailHolder() {
  const theme = useTheme();
  const style = styles(theme).detailHolder;
  const boxStyle = styles(theme).userPage;

  const { user } = useUserContext();

  const card = useCardContext();
  const { elevation } = card;

  const [updatedUser, setUpdatedUser] = useState(user);

  const { updateUser } = useUpdateUser(updatedUser);

  const handleFieldChange = (field: keyof User, value: string) => {
    setUpdatedUser((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  return (
    <Box sx={boxStyle.DetailHolderContainer}>
      <Card elevation={elevation} sx={style.card}>
        <CardContent>
          <Grid container spacing={2} marginTop={1}>
            {fields.map((field, index) => (
              <UserDetailGridItem
                key={index}
                user={user}
                field={field}
                onChange={handleFieldChange}
              />
            ))}
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
    </Box>
  );
}
