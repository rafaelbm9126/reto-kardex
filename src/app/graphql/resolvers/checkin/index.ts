import {
    InvoiceInputRawModel,
    InvoiceModel,
} from './type';
import OperatiosDB from '../../../database';
import { MiddlewareModel } from '../../type';
import {
    verifySessionToken,
    cryptRevertData,
} from '../../../helpers';

export default class CheckInResolver  {
    create_check_in (model: OperatiosDB) {
        return async (params: InvoiceInputRawModel, header: MiddlewareModel): 
        Promise<InvoiceModel | null> => {
            verifySessionToken(header.headers.authorization);
            try {
                params.input.buyer.document = cryptRevertData(params.input.buyer.document);
                return await model.update_invoice(params.input);
            } catch (error) {
                throw new Error(error);
            }
        };
    }
}
