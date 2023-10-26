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
import LoadingOverlay from "./components/loadingOverlay";
import ErrorOverlay from "./components/errorOverlay";
import { styles } from "./util/style";
import { UserPageContextProvider } from "./components/ContextProvider/UserPageContextProvider";
import { CardContextProvider } from "./components/ContextProvider/CardContextProvider";

export default function UserPage() {
  const theme = useTheme();
  const style = styles(theme).userPage;

  return (
    <UserPageContextProvider>
      <LoadingOverlay>
        <ErrorOverlay>
          <CardContextProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: ["column", "column", "row"],
                margin: "0 20px 0 20px",
              }}
            >
              <Box sx={style.profilePageHolder}>
                <ProfileHolder />
              </Box>

              <Box sx={style.DetailHolderContainer}>
                <DetailHolder />
              </Box>
            </Box>
          </CardContextProvider>
        </ErrorOverlay>
      </LoadingOverlay>
    </UserPageContextProvider>
  );
}
