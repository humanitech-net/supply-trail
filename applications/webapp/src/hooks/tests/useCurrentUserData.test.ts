import { renderHook } from "@testing-library/react";
import { useCurrentUserData } from "../useCurrentUserData";
import { ApolloError } from "@apollo/client";

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

jest.mock("../useCustomQuery", () => {
  return jest.fn((queryType) => {
    if (queryType === "GET_USER") {
      return {
        data: {
          getUser: mockUserData,
        },
        loading: false,
        error: ApolloError,
      };
    }
  });
});

describe("useCurrentUserData", () => {
  it("should return user data, loading, and error", () => {
    const { result } = renderHook(() => useCurrentUserData());

    const { user, loading, error } = result.current;

    expect(user).toEqual(mockUserData);
    expect(loading).toBe(false);
    expect(error).toBe(ApolloError);
  });
});
