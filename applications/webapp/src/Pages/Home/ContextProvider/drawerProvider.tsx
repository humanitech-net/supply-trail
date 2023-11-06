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

import React, { ReactNode, createContext, useState, useMemo } from "react";

interface DrawerContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerContext = createContext<DrawerContextProps>({
  open: false,
  setOpen: () => {},
});

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const props = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <DrawerContext.Provider value={props}>{children}</DrawerContext.Provider>
  );
};
