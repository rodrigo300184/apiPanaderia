import { Router } from "express";
import { infoService } from "../services/infoService.js";
import { ApiError } from "../utils/apiError.js";

export const infoController = Router();

infoController.get('/', async (_req, res) => {
    try {
        const info = await infoService.get();
        res.json(info);
    } catch (error) {
        return res.status(444).json(`${error}`);
    }
})
