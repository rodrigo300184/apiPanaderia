import authService from "../services/loginService.js";
import { Router } from "express";
import { generateValidationMiddleware } from "../validator/validationMiddleware.js";
import { loginSchema } from "../validator/validationSchemas.js";

export const loginController = Router();

loginController.post("/",generateValidationMiddleware(loginSchema), async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
      res.status(401).json({ error: true, messsage: `${error}` })
    }
}
);
