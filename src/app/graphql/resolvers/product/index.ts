import {
    ProductInputModel,
    ProductModel,
    ProductFindOne,
    ProductFindMany,
} from './type';
import OperatiosDB from '../../../database';
import { MiddlewareModel } from '../../type';
import {
    verifySessionToken,
} from '../../../helpers';

export default class ProductResolver  {

    product (model: OperatiosDB) {
        return async (params: ProductFindOne, header: MiddlewareModel): Promise<ProductModel | null> => {
            verifySessionToken(header.headers.authorization);
            try {
                return await model.oneProduct(params.id) as (ProductModel | null);
            } catch (error) {
                throw new Error(error);
            }
        };
    }

    products (model: OperatiosDB) {
        return async (params: ProductFindMany, header: MiddlewareModel): Promise<Array<ProductModel> | null> => {
            verifySessionToken(header.headers.authorization);
            try {
                const where = !!params.input.where ? JSON.parse(params.input.where) : {};
                const sort = !!params.input.sort ? JSON.parse(params.input.sort) : {};
                return await model.ManyProduct(
                    where,
                    sort,
                    params.input.limit,
                    params.input.pagination
                ) as (Array<ProductModel> | null);
            } catch (error) {
                throw new Error(error);
            }
        };
    }

    product_update_insert (model: OperatiosDB) {
        return async (params: ProductInputModel, header: MiddlewareModel): Promise<ProductModel | null> => {
            verifySessionToken(header.headers.authorization);
            try {
                return await model.update_product(params.input) as (ProductModel | null);
            } catch (error) {
                throw new Error(error);
            }
        };
    }
}
