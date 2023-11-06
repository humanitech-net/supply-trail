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

import { ApolloError, useMutation } from "@apollo/client";
import { MutationConfigs } from "./util/types";
import { mutationConfigs } from "./util/configs";

export function useGenericMutation<T extends keyof MutationConfigs>(
  mutationType: T,
  mutationVariables?: MutationConfigs[T]["variables"],
): {
  callMutation: () => void;
  data: MutationConfigs[T]["data"];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const config = mutationConfigs[mutationType];
  const [mutate, { data, loading, error }] = useMutation(config.mutation);

  const callMutation = async () => {
    mutate({
      variables: mutationVariables,
    });
  };
  return { callMutation, data, loading, error };
}
