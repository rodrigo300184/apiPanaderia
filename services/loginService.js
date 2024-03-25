import jwt from "jsonwebtoken";
import 'dotenv/config';

const defaultUser = {
    email: "email@email.com",
    password: "1234",
};

const secret = process.env.SECRET_KEY || '';

async function login(email, password) {
    if (email === defaultUser.email && password === defaultUser.password) return signJWT({ email })
    throw new Error('Wrong email or password!')
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