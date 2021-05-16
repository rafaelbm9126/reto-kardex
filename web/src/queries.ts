export const QUERY_LIST_PRODUCTS = `
    query Product ($input: QueryFindMany) {
        products (input: $input) {
            id
            code
            name
            description
            price
            stock
        }
    }
`;

export const QUERY_ONE_PRODUCT = `
    query Product ($id: ID!) {
        product (id: $id) {
            id
            code
            name
            description
            price
            stock
        }
    }
`;

export const MUT_INSERT_UPDATE_PRODUCT = `
    mutation Product ($input: ProductInput!) {
        product_mut (input: $input) {
            id
            code
            name
            description
            price
            stock
        }
    }
`;
