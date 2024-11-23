import crypto from 'crypto'

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string): string => {
    const hash = crypto
        .createHash('sha256')
        .update([salt, password].join('/'))
        .update(process.env.AUTH_SECRET)
        .digest('hex');
    return hash;
};
