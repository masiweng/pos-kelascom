import { creatDataProduct, deleteDataProduct, getDataProducts, updateDataProduct } from "../repositories/products.js";
import { successResponse, errorResponse } from "../utilities/response.js";
import bcrypt, { hash } from 'bcrypt';

export const getProducts = async (req, res, next) => {
  try {
    let [products] = await getDataProducts();
    if (products.length > 0) {
      successResponse(res, "Success", products)
    } else {
      errorResponse(res, "Data not found!", 404)
    }
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    let code = req.body.code;
    let name = req.body.name;
    let stock = req.body.stock;
    let price =req.body.price;

    if (code || name || stock || price != null) {
      let [result] = await creatDataProduct(code, name, stock, price);

      if (result.insertId > 0) {
        successResponse(res, "Success create data!", result.insertId, 201);
      } else {
        errorResponse(res, "Error create data!");
      }
    } else {
      errorResponse(res, "Not empty");
    }
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    let id = req.params.id;
    let code = req.body.code;
    let name = req.body.name;
    let stock = req.body.stock;
    let price = req.body.price;

    let [result] = await updateDataProduct(id, code, name, stock, price);

    if (result.affectedRows > 0) {
      successResponse(res, "Success updating data!", result.affectedRows);
    } else {
      errorResponse(res, "ID not found!", 404);
    }
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    let id = req. params.id;
    let [result] = await deleteDataProduct(id);

    if (result.affectedRows > 0) {
      successResponse(res, "Success delete data user!", result);
    } else {
      errorResponse(res, "ID not found!", 404);
    }
  } catch (error) {
    next(error)
  }
}