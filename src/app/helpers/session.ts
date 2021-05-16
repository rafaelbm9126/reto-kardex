import jwt from 'jsonwebtoken';

export const createJwtSession = (data: string): string => {
    if (!!!process.env.SECRET) {
        throw new Error('secret key not exist');
    }
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        data,
    }, process.env.SECRET || '');
}

export const verifySessionToken = (token: string): object => {
    if (!!!process.env.SECRET) {
        throw new Error('secret key not exist');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET || '');
        return typeof decoded === 'string' ? JSON.parse(decoded) : decoded;
    } catch (_) {
        throw new Error('error session unauthorized');
    }
}
