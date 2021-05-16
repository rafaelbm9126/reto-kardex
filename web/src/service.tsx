import {
  DataProvider,
  GetListResult,
  GetOneResult,
  GetManyResult,
  GetManyReferenceResult,
  UpdateResult,
  UpdateManyResult,
  CreateResult,
  DeleteResult,
  DeleteManyResult,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams,
  CreateParams
} from "react-admin";
import {
  fnDefault,
  prepareQueryMany,
  prepareQueryOne,
  prepareMutationOne,
} from './helper';
import {
  QUERY_LIST_PRODUCTS,
  QUERY_ONE_PRODUCT,
  MUT_INSERT_UPDATE_PRODUCT,
} from './queries';

type ReasponseList = { data: { data: { [key: string]: GetListResult<any> } } };

type ResponseOne = { data: { data: { [key: string]: GetOneResult<any> } } };

type ResponseMutOne = { data: { data: { [key: string]: CreateResult<any> | UpdateResult<any> } } };

const mutationFunction = async (resource: string, params: CreateParams<any> | UpdateParams<any>) => {
  let Query = '';

  switch (resource) {
    case 'product':
      Query = MUT_INSERT_UPDATE_PRODUCT;
  }

  const response = await prepareMutationOne<ResponseMutOne>(Query, params);

  console.log(response);

  return new Promise<UpdateResult<any>>((resolve) =>
    resolve({
      data: response.data.data[`${resource}_mut`],
    } as any)
  );
};

export const ComposeData = (): DataProvider => {
  return {
    getList: async (resource: string, params: GetListParams) => {
      let Query = '';

      switch (resource) {
        case 'product':
          Query = QUERY_LIST_PRODUCTS;
      }

      const response = await prepareQueryMany<ReasponseList>(Query, params);

      return new Promise<GetListResult<any>>((resolve) =>
        resolve({
          data: response.data.data[`${resource}s`],
          total: 1
        } as any)
      );

    },
    getOne: async (resource: string, params: GetOneParams) => {
      let Query = '';

      switch (resource) {
        case 'product':
          Query = QUERY_ONE_PRODUCT;
      }

      const response = await prepareQueryOne<ResponseOne>(Query, params);

      return new Promise<GetOneResult<any>>((resolve) =>
        resolve({
          data: response.data.data[resource],
        } as any)
      );
    },
    getMany: async (resource: string, params: GetManyParams) => {
      // const filters = "?id=" + params.ids.join("&id=");
      // const {
      //   data: { data }
      // } = await axios.get(`${API}${resource}${filters}`);
      return new Promise<GetManyResult<any>>((resolve) =>
        resolve({
          data: []
        } as any)
      );
    },
    getManyReference: () => fnDefault<GetManyReferenceResult<any>>(),
    updateMany: () => fnDefault<UpdateManyResult>(),
    update: mutationFunction,
    create: mutationFunction,
    delete: () => fnDefault<DeleteResult<any>>(),
    deleteMany: () => fnDefault<DeleteManyResult>()
  };
};
