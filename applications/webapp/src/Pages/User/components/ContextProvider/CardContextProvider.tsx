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
import { useCurrentCardState } from "../../../../hooks/useCurrentCardState";
import { CardContext } from "../../context";

export function CardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const card = useCurrentCardState();
  return <CardContext.Provider value={card}>{children}</CardContext.Provider>;
}
