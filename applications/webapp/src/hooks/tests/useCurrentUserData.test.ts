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

import { renderHook } from "@testing-library/react";
import { useCurrentUserData } from "../useCurrentUserData";
import useCustomQuery from "../useCustomQuery";

jest.mock("../useCustomQuery");

describe("useCurrentUserData", () => {
  const mockUserData = {
    username: "username",
    firstName: "firstname",
    lastName: "lastname",
    email: "username@email",
    phoneNumber: "123456789",
    address: "Addis Ababa",
    birthdate: "April 19, 2001",
    description: "Hi, I am username",
  };

  it("should return user data, loading, and error", () => {
    (useCustomQuery as jest.Mock).mockImplementation(() => ({
      data: { getUser: mockUserData },
      loading: false,
      error: undefined,
    }));

    const { result } = renderHook(() => useCurrentUserData());

    const { user, loading, error } = result.current;
    expect(user).toEqual(mockUserData);

    expect(loading).toBe(false);
    expect(error).toBeUndefined();
  });

  it("should return error if failed to get user data", () => {
    const errorMessage = "Failed to get user data";

    (useCustomQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      loading: false,
      error: errorMessage,
    }));

    const { result } = renderHook(() => useCurrentUserData());
    const { loading, error } = result.current;

    expect(loading).toBe(false);
    expect(error).toBe(errorMessage);
  });
});
