export default `
    # *** QUERY *** #

    input QueryFindMany {
        where: String
        sort: String
        limit: Int
        pagination: Int
    }

    type Product {
        id: ID
        code: ID
        name: String
        price: Float
        description: String
        stock: Int
    }

    type Query {
        product (id: ID!): Product
        products (input: QueryFindMany): [Product]
    }

    # *** MUTATIONS *** #

    input RegisterAuthInput {
        username: String!
        email: String!
        password: String!
    }
    type RegisterResponse {
        ok: Boolean
    }
    input LoginAuthInput {
        email: String!
        password: String!
    }
    type UserLogin {
        username: String
        email: String
    }
    type LoginResponse {
        jwt: String
        user: UserLogin
    }

    input ProductInput {
        code: ID!
        name: String!
        price: Float!
        description: String
        stock: Int!
    }

    enum TypePay {
        CASH
        DEBIT
        CREDIT
    }

    input BuyerInvoiceInput {
        document: String!
        name: String
        address: String
        cellphone: String
    }
    input ProductInvoiceInput {
        productId: ID!
        price: Float!
        quantity: Int!
        subTotal: Float!
    }
    input InvoiceInput {
        buyer: BuyerInvoiceInput!
        products: [ProductInvoiceInput]!
        typePay: TypePay!
        total: Float!
    }

    type BuyerInvoice {
        id: ID
        document: String
        name: String
        address: String
        cellphone: String
    }
    type ProductInvoice {
        id: ID
        productId: ID
        price: Float
        quantity: Int
        subTotal: Float
    }
    type Invoice {
        id: ID
        buyer: BuyerInvoice
        products: [ProductInvoice]
        typePay: TypePay
        total: Float
        canceled: Boolean
    }

    type Mutation {
        register (input: RegisterAuthInput!): RegisterResponse
        login (input: LoginAuthInput!): LoginResponse
        product_mut (input: ProductInput!): Product
        checkin (input: InvoiceInput!): Invoice
    }
`;
