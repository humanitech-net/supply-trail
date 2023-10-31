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

export default function Overlay({ children }: { children: React.ReactNode }) {
  const { loading, error } = useUserContext();

  if (loading) {
    return <>Overlay spinner goes here</>;
  }

  if (error) {
    return <>Error Message</>;
  }
  return <>{children}</>;
}
