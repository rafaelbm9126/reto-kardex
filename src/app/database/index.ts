import connection from './connection';
import { Schema, Model, Document, Types } from 'mongoose';
import {
    RegisterInput,
    LoginInput,
    LoginFindOneModel,
} from '../graphql/resolvers/authentication/type';
import {
    ProductModel,
    ProductFindMany,
} from '../graphql/resolvers/product/type';
import {
    InvoiceInputModel,
    InvoiceModel,
    BuyerInvoiceModel,
    ProductInvoiceModel,
} from '../graphql/resolvers/checkin/type';

export default class OperatiosDB {
    user: Model<any> | null = null;
    product: Model<ProductModel> | null = null;
    buyer_invoice: Model<BuyerInvoiceModel> | null = null;
    product_invoice: Model<ProductInvoiceModel> | null = null;
    invoice: Model<any> | null = null;

    constructor () {
        this.user = connection.model('_user', new Schema({
            email: {
                type: String,
                index: true,
                unique: true,
            },
            username: {
                type: String,
                unique: true,
            },
            password: String,
            confirmed: Boolean,
            blocked: Boolean,
            created : { type : Date, default: Date.now },
        }));
        this.product = connection.model('_product', new Schema({
            code: {
                type: String,
                index: true,
                unique: true,
            },
            name: String,
            price: Number,
            description: String,
            stock: Number,
            created : { type : Date, default: Date.now },
        }));
        this.buyer_invoice = connection.model('_buyer_invoice', new Schema({
            document: {
                type: String,
                index: true,
                unique: true,
            },
            name: String,
            address: String,
            cellphone: String,
            created : { type : Date, default: Date.now },
        }));
        this.product_invoice = connection.model('_product_invoice', new Schema({
            productId: String,
            price: Number,
            quantity: Number,
            subTotal: Number,
            created : { type : Date, default: Date.now },
        }));
        this.invoice = connection.model('_invoice', new Schema({
            buyer: String,
            products: [String],
            typePay: String,
            total: Number,
            canceled: Boolean,
            created : { type : Date, default: Date.now },
        }));
    }

    async register_auth (user: RegisterInput): Promise<void> {
        await this.user?.create(user);
    }

    async login_auth (user: LoginInput): Promise<LoginFindOneModel> {
        return await this.user?.findOne(user, null, {})
            .exec();
    }

    async update_product (product: ProductModel):
    Promise<(ProductModel & Document<any, any>) | null> {
        return await this.product?.findOneAndUpdate({
            code: product.code,
        }, product, {
            upsert: true,
            setDefaultsOnInsert: true,
            returnOriginal: false,
        }) as ((ProductModel & Document<any, any>) | null);
    }

    async stock_product (code: string, cant: number):
    Promise<(ProductModel & Document<any, any>) | null> {
        return await this.product?.findOneAndUpdate({
            code,
        }, { $dec: { stock: cant } }, {
            upsert: true,
            setDefaultsOnInsert: true,
            returnOriginal: false,
        }) as ((ProductModel & Document<any, any>) | null);
    }

    async update_invoice (invoice: InvoiceInputModel): Promise<InvoiceModel | null> {
        const buyer = await this.buyer_invoice?.findOneAndUpdate({
            document: invoice.buyer.document,
        }, { ...invoice.buyer }, {
            upsert: true,
            setDefaultsOnInsert: true,
            returnOriginal: false,
        });

        const products = await this.product_invoice?.create(invoice.products);

        const ids_products = products?.map<string>(item => item.id);

        const invoice_response = await this.invoice?.create({
            buyer: buyer?.id,
            products: ids_products,
            typePay: invoice.typePay,
            total: invoice.total,
            canceled: false,
        });

        return {
            id: invoice_response.id,
            buyer: buyer as BuyerInvoiceModel,
            products: products as Array<ProductInvoiceModel>,
            typePay: invoice_response.typePay,
            total: invoice_response.total,
            canceled: invoice_response.canceled,
        };
    }

    async oneProduct (id: string): Promise<ProductModel | null> {
        return await this.product?.findById(Types.ObjectId(id)) as (ProductModel | null);
    }

    async ManyProduct (
        where: any = {},
        sort: any = {},
        limit: number = 10,
        pagination: number = 0
    ): Promise<ArrayLike<ProductModel> | null> {
        return await this.product?.find(where, null, {
            skip: pagination,
            limit: limit,
        })
            .sort(sort)
            .exec() as (Array<ProductModel> | null);
    }

}
