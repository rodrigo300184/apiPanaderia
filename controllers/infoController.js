import { Router } from "express";
import { infoService } from "../services/infoService.js";


export const infoController = Router();

infoController.get('/', (_req, res) => {
    try {
        const info = infoService.get();
        res.json(info);
    } catch (error) {
        return res.status(444).json(`${error}`);
    }
})
