import { Router } from "express";
import { productService } from "../services/productService.js";
import { generateValidationMiddleware } from '../validator/validationMiddleware.js';
import { productSchema } from '../validator/validationSchemas.js';

export const productsController = Router();

productsController.get("/", async (_req, res, next) => {
  try {
    const productsData = await productService.fetchAll();
    res.json({ productsData });
  } catch (error) {
    next(error);
  }
});

productsController.get("/:id", async (req, res, next) => {
  try {
    const product = await productService.fetchOne(req.params.id);
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

productsController.post(
  "/",
  generateValidationMiddleware(productSchema),
  async (req, res, next) => {
    try {
      const newProduct = await productService.createOne(req.body);
      res.json({ newProduct });
    } catch (error) {
      next(error);
    }
  }
);

productsController.delete("/:id", async (req, res, next) => {
  try {
    await productService.deleteOne(req.params.id);
    res.json("The product was correctly deleted.");
  } catch (error) {
    next(error);
  }
});

productsController.put(
  "/:id",
  generateValidationMiddleware(productSchema),
  async (req, res, next) => {
    try {
      const updatedBooking = await productService.editOne(
        req.params.id || "",
        req.body
      );
      res.json({ updatedBooking });
    } catch (error) {
      next(error);
    }
  }
);
