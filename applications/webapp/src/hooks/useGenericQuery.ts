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

import { queryConfigs } from "./util/configs";
import { QueryConfigs } from "./util/types";
import { ApolloError, useQuery } from "@apollo/client";

export default function useGenericQuery<T extends keyof QueryConfigs>(
  queryType: T,
  variables?: QueryConfigs[T]["variables"],
): {
  data: QueryConfigs[T]["data"] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const config = queryConfigs[queryType];

  if (!config) {
    throw new Error(`Unsupported query type: ${queryType}`);
  }

  const { data, loading, error } = useQuery(config.query, { variables });

  if (data) {
    const validationResult = config.schema.validate(data);
    if (validationResult.error) {
      throw new Error(
        `Invalid data structure returned by the query. ${validationResult.error}`,
      );
    }
  }
  return { data, loading, error };
}
