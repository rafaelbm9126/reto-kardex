import sha256 from 'crypto-js/sha256';
import { AES, enc } from 'crypto-js';

export const cryptPassword = (password: string): string => {
    return sha256(password).toString();
}

export const cryptRevertData = (data: string): string => {
    if (!!!process.env.SECRET) {
        throw new Error('secret key not exist');
    }
    return AES.encrypt(data, process.env.SECRET || '').toString();
}

export const decryptRevertData = (encrypt: string): string => {
    if (!!!process.env.SECRET) {
        throw new Error('secret key not exist');
    }
    const bytes  = AES.decrypt(encrypt, process.env.SECRET || '');
    return bytes.toString(enc.Utf8);
}
