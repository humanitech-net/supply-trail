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
import { Grid, TextField } from "@mui/material";
import { User } from "../../../Pages/interface";
import { useCardContext } from "../context";
import { labels } from "../util/constants";

export function UserDetailGridItem(
  props: Readonly<{
    user: User;
    field: keyof User;
    onChange: (field: keyof User, val: string) => void;
  }>,
) {
  const { user, field, onChange } = props;
  const card = useCardContext();

  const updateValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(field, event.target.value);
    },
    [field],
  );

  return (
    <Grid item xs={6}>
      <TextField
        fullWidth
        label={labels[field] ?? "N/A"}
        defaultValue={user[field]}
        disabled={card.editable}
        onChange={updateValue}
      />
    </Grid>
  );
}
