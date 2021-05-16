export interface RegisterInput {
    username: string;
    email: string;
    password: string;
    confirmed?: boolean;
    blocked?: boolean;
}

export interface RegisterAuthInputModel {
    input: RegisterInput;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginAuthInputModel {
    input: LoginInput;
}

export interface LoginResposeModel {
    jwt: string;
    user: {
        username: string;
        email: string;
    }
}

export interface LoginFindOneModel {
    id: string;
    username: string;
    email: string;
    password?: string;
    confirmed: boolean;
    blocked: boolean;
}
