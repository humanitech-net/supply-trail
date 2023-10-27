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
