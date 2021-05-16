export interface ProductModel {
    id?: string;
    code: string;
    name: string;
    price: number;
    description: string;
    stock: number;
}

export interface ProductInputModel {
    input: ProductModel;
}

export interface ProductFindOne {
    id: string;
}

export interface ProductFindMany {
    input: {
        where: string;
        sort: string;
        limit: number;
        pagination: number;
    }
}
