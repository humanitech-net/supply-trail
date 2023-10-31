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
import Overlay from "./components/overlay";
import { UserPageContextProvider } from "./components/ContextProvider/UserPageContextProvider";
import { CardContextProvider } from "./components/ContextProvider/CardContextProvider";
import { styles } from "./util/style";

export default function UserPage() {
  const theme = useTheme();
  const style = styles(theme).userPage;
  return (
    <UserPageContextProvider>
      <Overlay>
        <CardContextProvider>
          <Box sx={style.userPageContainer}>
            <ProfileHolder />
            <DetailHolder />
          </Box>
        </CardContextProvider>
      </Overlay>
    </UserPageContextProvider>
  );
}
