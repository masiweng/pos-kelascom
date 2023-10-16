import { creatDataUser, deleteDataUser, getDataUsers, updateDataUser } from "../repositories/users.js"
import { successResponse, errorResponse } from "../utilities/response.js";
import bcrypt, { hash } from 'bcrypt';

export const getUsers = async (req, res, next) => {
  try {
    let [users] = await getDataUsers();
    if (users.length > 0) {
      successResponse(res, "Success", users)
    } else {
      errorResponse(res, "Data not found!", 404)
    }
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    let level_id = req.body.level_id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let is_active =req.body.is_active;

    let saltRound = 10;
    bcrypt.hash(password, saltRound, async ( error, hashPass) => {
      let [result] = await creatDataUser(level_id, name, email, hashPass, is_active);

      if (result.insertId > 0) {
        successResponse(res, "Success create data user!", result.insertId, 201);
      } else {
        errorResponse(res, "Error create data user!");
      }
    })
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let is_active = req.body.is_active;

    let [result] = await updateDataUser(id, name, email, is_active);

    if (result.affectedRows > 0) {
      successResponse(res, "Success updating data user!", result.affectedRows);
    } else {
      errorResponse(res, "ID not found!", 404);
    }
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    let id = req. params.id;
    let [result] = await deleteDataUser(id);

    if (result.affectedRows > 0) {
      successResponse(res, "Success delete data user!", result);
    } else {
      errorResponse(res, "ID not found!", 404);
    }
  } catch (error) {
    next(error)
  }
}