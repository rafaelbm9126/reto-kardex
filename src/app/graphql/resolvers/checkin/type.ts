type TypePay = 'CASH' | 'DEBIT' | 'CREDIT';

export interface BuyerInvoiceModel {
    id: string;
    document: string;
    name: string;
    address: string;
    cellphone: string;
}

export interface ProductInvoiceModel {
    id: string;
    productId: string;
    price: number;
    quantity: number;
    subTotal: number;
}

export interface InvoiceModel {
    id: string;
    buyer: BuyerInvoiceModel;
    products: Array<ProductInvoiceModel>;
    typePay: TypePay;
    total: number;
    canceled: boolean;
}

type BuyerInvoiceInputModel = Omit<BuyerInvoiceModel, "id">;

type ProductInvoiceInputModel = Omit<ProductInvoiceModel, "id">;

export interface InvoiceInputModel {
    buyer: BuyerInvoiceInputModel;
    products: Array<ProductInvoiceInputModel>;
    typePay: TypePay;
    total: number;
}

export interface InvoiceInputRawModel {
    input: InvoiceInputModel;
}
