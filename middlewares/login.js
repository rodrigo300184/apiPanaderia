import loginService from "../services/loginService.js";

export function authMiddleware(req, res, next) {
    let token = req.get('token') || '';
    try {
        loginService.verifyJWT(token)
        return next();
    } catch (error) {
        return res.status(401).json('Error: Incorrect Token')
    }
}
