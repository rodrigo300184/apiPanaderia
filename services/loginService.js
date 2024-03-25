import jwt from "jsonwebtoken";
import 'dotenv/config';
import logger from '../utils/logger.js'

const defaultUser = {
    email: "email@email.com",
    password: "1234",
};

const secret = process.env.SECRET_KEY || '';

async function login(email, password) {
    try {
        if (email === defaultUser.email && password === defaultUser.password) {
            const token = await signJWT({ email });
            logger.info(`Successful login for email: ${email}`);
            return token;
        } else {
            throw new Error('Wrong email or password!');
        }
    } catch (error) {
        logger.error(`Error during login: ${error.message}`);
        throw error;
    }
}


function signJWT(payload) {
    const token = jwt.sign(payload, secret);
    return { payload, token };
}

function verifyJWT(token) {
    const verifiedResult = jwt.verify(token, secret)
    return verifiedResult;
};

const loginService = {
    login,
    signJWT,
    verifyJWT,
};

export default loginService;