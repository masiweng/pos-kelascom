import bcrypt from 'bcrypt';
import { getUserByEmail } from '../repositories/users.js';
import { successResponse, errorResponse } from '../utilities/response.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const login = async (request, response, next) => {
  try {
      let email = request.body.email;
      let password = request.body.password;

      const [result] = await getUserByEmail(email, password);

      if(result.length > 0) {
          const user = result[0];
          bcrypt.compare(password, user.password, (error, isValid) => {
              if (isValid) {
                  let payload = {
                      id: user.id_uer,
                      name: user.name,
                      email: user.email
                  }

                  let accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "15m"});
                  let refreshToken = jwt.sign(payload, process.env.SECRET_RERESH_TOKEN, {expiresIn: "30m"});

                  let data = {
                      access_token: accessToken,
                      refresh_token: refreshToken
                  }
                  
                  successResponse(response, "success", data);
              } else {
                  errorResponse(response, "invalid email or password", 401);
              }
          })
      }
  } catch (error) {
      next(error)
  }
}

export const validateToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];
  
  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (error, claims) => {
      if(error) {
        errorResponse(response, error.message, 403)
      } else {
        request.claims = claims
        next();
      }
    })
  } else {
    errorResponse(response, "invalid request, authoriztion not found!!!");
  }
}