import crypto from 'crypto';

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
export function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
export function sha512(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        password: value
    };
}

export function saltHashPassword(userpassword) {
    let salt = generateRandomString(16);
    return sha512(userpassword, salt);
}

export function checkHash(plainPassword, hashedPassword, salt) {
    return sha512(plainPassword, salt).password === hashedPassword;
}