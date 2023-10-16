import { creatSales } from "../repositories/sales.js";
import { successResponse, errorResponse } from "../utilities/response.js";

export const createSale = async (req, res, next) => {
  try {
    let product_id = req.body.product_id;
    let qty = req.body.qty;
    let price = req.body.price;
    let total = req.body.total;

    let [result] = await creatSales(product_id, qty, price, total);

      if (result.insertId > 0) {
        successResponse(res, "Success create data!", result.insertId, 201);
      } else {
        errorResponse(res, "Error create data!");
      }
  } catch (error) {
    next(error);
  }
}