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

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./Components/navbar";
import LeftDrawer from "./Components/leftDrawer";
import MainContent from "./Components/mainContent";
import Footer from "./Components/footer";

export default function App() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <NavBar open={open} openDrawer={openDrawer} />
      <LeftDrawer open={open} closeDrawer={closeDrawer} />
      <MainContent open={open} />
      <Footer />
    </Box>
  );
}
