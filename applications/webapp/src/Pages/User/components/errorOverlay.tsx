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
import { useUserContext } from "../context";

export default function ErrorOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const { error } = useUserContext();

  return error ? <>Erro Message</> : <>{children}</>;
}
