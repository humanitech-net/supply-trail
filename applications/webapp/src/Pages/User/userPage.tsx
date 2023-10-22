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

import React, { useState, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import ProfileHolder from "./components/profileHolder";
import DetailHolder from "./components/detailHolder";
import { EditableCardElevation, styles } from "./util/style";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "./graphql/userQuery";
import { CardContext, UserContext } from "./context";

export default function UserPage() {
  const theme = useTheme();
  const style = styles(theme).userPage;

  const [editable, setEditable] = useState(true);
  const [elevation, setElevation] = useState(0);

  const { data } = useQuery(getUserQuery);
  const { getUser } = data || {};

  const username = getUser?.username;
  const firstName = getUser?.firstName;
  const lastName = getUser?.lastName;
  const email = getUser?.email;
  const phoneNumber = "123456789";
  const address = "Addis Ababa";
  const birthdate = "April 19 2001";
  const description = `Hi I am ${getUser?.username}`;

  const user = useMemo(() => {
    return {
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      birthdate,
      description,
    };
  }, [
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    birthdate,
    description,
  ]);

  const editUser = () => {
    setEditable((isEditable) => !isEditable);
    setElevation((cardElevation) =>
      cardElevation === 0 ? EditableCardElevation : 0,
    );
  };

  const card = useMemo(() => {
    return {
      editable,
      setEditable,
      elevation,
      setElevation,
      editUser,
    };
  }, [editable, setEditable, elevation, setElevation, editUser]);

  return (
    <UserContext.Provider value={user}>
      <CardContext.Provider value={card}>
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            margin: "0 20px 0 20px",
          }}
        >
          <Box sx={style.profilePageHolder}>{data && <ProfileHolder />}</Box>

          <Box sx={style.DetailHolderContainer}>{data && <DetailHolder />}</Box>
        </Box>
      </CardContext.Provider>
    </UserContext.Provider>
  );
}
