import axios from "axios";
import {
  CreateParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from "react-admin";

export const fnDefault = <T>(): Promise<T> => {
  return new Promise<T>((resolve) => resolve([] as any));
};

const API = "http://localhost:8080/graphql";

export const prepareQueryMany = async <T>(
  Query: string,
  params: GetListParams
): Promise<T> => {
  return await axios.post(
    API,
    {
      query: Query,
      variables: {
        input: {
          where: JSON.stringify(params.filter),
          sort: JSON.stringify({ [params.sort.field]: params.sort.order }),
          limit: params.pagination.perPage,
          pagination: params.pagination.page - 1,
        },
      },
    },
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjM3MTIwMzgsImRhdGEiOiJ7XCJpZFwiOlwiNjBhMDRmOTVkYjA1YTMwMDI5Y2UwNmNkXCIsXCJjb25maXJtZWRcIjp0cnVlLFwiYmxvY2tlZFwiOmZhbHNlfSIsImlhdCI6MTYyMTEyMDAzOH0.KsFkR9u863_doAgGg8dnetngfGYblKAQcaaJcAd99nY",
      },
    }
  );
};

export const prepareQueryOne = async <T>(
  Query: string,
  params: GetOneParams
): Promise<T> => {
  return await axios.post(
    API,
    {
      query: Query,
      variables: {
        id: params.id,
      },
    },
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjM3MTIwMzgsImRhdGEiOiJ7XCJpZFwiOlwiNjBhMDRmOTVkYjA1YTMwMDI5Y2UwNmNkXCIsXCJjb25maXJtZWRcIjp0cnVlLFwiYmxvY2tlZFwiOmZhbHNlfSIsImlhdCI6MTYyMTEyMDAzOH0.KsFkR9u863_doAgGg8dnetngfGYblKAQcaaJcAd99nY",
      },
    }
  );
};

export const prepareMutationOne = async <T>(
  Query: string,
  params: CreateParams<any> | UpdateParams<any>
): Promise<T> => {
  if (!!params.data.id) {
    params.data.id = undefined;
  }
  return await axios.post(
    API,
    {
      query: Query,
      variables: {
        input: {
          ...params.data,
        },
      },
    },
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjM3MTIwMzgsImRhdGEiOiJ7XCJpZFwiOlwiNjBhMDRmOTVkYjA1YTMwMDI5Y2UwNmNkXCIsXCJjb25maXJtZWRcIjp0cnVlLFwiYmxvY2tlZFwiOmZhbHNlfSIsImlhdCI6MTYyMTEyMDAzOH0.KsFkR9u863_doAgGg8dnetngfGYblKAQcaaJcAd99nY",
      },
    }
  );
};
