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
import { Box, useTheme } from "@mui/material";
import ProfileHolder from "./components/profileHolder";
import DetailHolder from "./components/detailHolder";
import { styles } from "./styles/style";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "./graphql/userQuery";

export default function UserPage() {
  const theme = useTheme();
  const style = styles(theme).userPage;

  const [enabled, setEnabled] = useState(true);
  const [elevation, setElevation] = useState(0);

  const editUser = () => {
    const elevate = 5;
    const zeroElevation = 0;
    setEnabled((enabled) => !enabled);
    setElevation((elevation) =>
      elevation === zeroElevation ? elevate : zeroElevation,
    );
  };

  const { data } = useQuery(getUserQuery);
  const { getUser } = data || {};

  const mockUser = {
    phonenumber: "123456789",
    address: "Addis Ababa",
    birthDate: "April 19 2001",
    description: `Hi I am ${getUser?.username}`,
  };

  const userDetail = {
    username: getUser?.username,
    firstName: getUser?.firstName,
    lastName: getUser?.lastName,
    email: getUser?.email,
    phoneNumber: mockUser["phonenumber"],
    address: mockUser.address,
    birthdate: mockUser.birthDate,
  };

  const card = {
    editable: enabled,
    setEditable: setEnabled,
    elevation: elevation,
    setElevation: setElevation,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row"],
        margin: "0 20px 0 20px",
      }}
    >
      <Box sx={style.profilePageHolder}>
        {data && (
          <ProfileHolder
            aria-label="profile holder"
            username={userDetail.username}
            description={mockUser.description}
            editUser={editUser}
          />
        )}
      </Box>

      <Box sx={style.DetailHolderContainer}>
        {data && (
          <DetailHolder
            aria-label="detail holder"
            user={userDetail}
            card={card}
          />
        )}
      </Box>
    </Box>
  );
}
