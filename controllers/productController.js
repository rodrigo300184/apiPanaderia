import { Router } from "express";
import { productService } from "../services/productService";

export const productsController = Router();

productsController.get("/", async (_req, res, next) => {
  try {
    const bookingsData = await productService.fetchAll();
    res.json({ bookingsData });
  } catch (error) {
    next(error);
  }
});

productsController.get("/:id", async (req, res, next) => {
  try {
    const booking = await productService.fetchOne(req.params.id);
    res.json({ booking });
  } catch (error) {
    next(error);
  }
});

productsController.post(
  "/",
  generateValidationMiddleware(bookingSchema),
  async (req, res, next) => {
    try {
      const newBooking = await productService.createOne(req.body);
      res.json({ newBooking });
    } catch (error) {
      next(error);
    }
  }
);

productsController.delete("/:id", async (req, res, next) => {
  try {
    await productService.deleteOne(req.params.id);
    res.json("The booking was correctly deleted.");
  } catch (error) {
    next(error);
  }
});

productsController.put(
  "/:id",
  generateValidationMiddleware(bookingSchema),
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
