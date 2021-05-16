import {
    RegisterAuthInputModel,
    LoginAuthInputModel,
    LoginResposeModel,
    LoginFindOneModel,
} from './type';
import OperatiosDB from '../../../database';
import {
    cryptPassword,
    createJwtSession,
} from '../../../helpers';

export default class AuthResolver  {
    register (model: OperatiosDB) {
        return async (params: RegisterAuthInputModel): Promise<object | undefined> => {
            try {
                const password = cryptPassword(params.input.password);
                await model?.register_auth({
                    ...params.input,
                    password,
                    confirmed: true,
                    blocked: false
                });
            } catch (error) {
                throw new Error(error);
            }
            return { ok: true };
        };
    }

    login (model: OperatiosDB) {
        return async (params: LoginAuthInputModel): Promise<LoginResposeModel | undefined> => {
            let token = '';
            let access: LoginFindOneModel | undefined;
            try {
                const password = cryptPassword(params.input.password);
                access = await model?.login_auth({ ...params.input, password});
                if (!!access) {
                    access.password = undefined;
                    token = createJwtSession(JSON.stringify({
                        id: access.id,
                        confirmed: access.confirmed,
                        blocked: access.blocked,
                    }));
                } else {
                    throw new Error('email or password incorrects')
                }
            } catch (error) {
                throw new Error(error);
            }
            return {
                jwt: token,
                user: {
                    username: access.username,
                    email: access.email,
                },
            };
        };
    }
}
