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
import { Box, useTheme } from "@mui/material";
import ProfileHolder from "./components/profileHolder";
import DetailHolder from "./components/detailHolder";
import { styles } from "./styles/style";

export default function UserPage() {
  const theme = useTheme();
  const style = styles(theme).userPage;

  const mockUser = {
    username: "Yonas",
    firstname: "Yonas",
    lastname: "Seyoum",
    email: "yonasseyoum24@gmail.com",
    phonenumber: "123456789",
    address: "Addis Ababa",
    birthDate: "April 19 2001",
    description: "Hi I am Yonas",
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
        <ProfileHolder
          username={mockUser.username}
          description={mockUser.description}
        />
      </Box>

      <Box sx={style.DetailHolderContainer}>
        <DetailHolder
          firstName={mockUser.firstname}
          lastName={mockUser.lastname}
          email={mockUser.email}
          phoneNumber={mockUser.phonenumber}
          address={mockUser.address}
          birthdate={mockUser.birthDate}
        />
      </Box>
    </Box>
  );
}
