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

import { act, renderHook } from "@testing-library/react";
import { useCurrentCardState } from "../useCurrentCardState";
import { EditableCardElevation } from "../../Pages/User/util/style";

describe("useCurrentCardState", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCurrentCardState());

    expect(result.current.editable).toBe(true);
    expect(result.current.elevation).toBe(0);
  });

  it("should toggle editable state when calling editUser", () => {
    const { result } = renderHook(() => useCurrentCardState());

    act(() => {
      result.current.editUser();
    });

    expect(result.current.editable).toBe(false);

    act(() => {
      result.current.editUser();
    });

    expect(result.current.editable).toBe(true);
  });

  it("should update elevation state when calling editUser", () => {
    const { result } = renderHook(() => useCurrentCardState());

    act(() => {
      result.current.editUser();
    });

    expect(result.current.elevation).toBe(EditableCardElevation);

    act(() => {
      result.current.editUser();
    });

    expect(result.current.elevation).toBe(0);
  });
});
