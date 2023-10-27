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

import { useMemo, useState } from "react";
import { EditableCardElevation } from "../Pages/User/util/style";

export function useCurrentCardState() {
  const [editable, setEditable] = useState(true);
  const [elevation, setElevation] = useState(0);

  const editUser = () => {
    setEditable((isEditable) => !isEditable);
    setElevation((cardElevation) =>
      cardElevation === 0 ? EditableCardElevation : 0,
    );
  };

  const card = useMemo(
    () => ({
      editable,
      setEditable,
      elevation,
      setElevation,
      editUser,
    }),
    [editable, setEditable, elevation, setElevation, editUser],
  );

  return card;
}
