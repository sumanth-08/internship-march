import jwt from "jsonwebtoken";
import RESPONSE from "../configs/global.js";
import { send } from "../helpers/responseHelper.js";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return send(res, RESPONSE.ACCESS_DENIED);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECURITYKEY);
    req.user = decoded;
    
  } catch (err) {
    return send(res, RESPONSE.INVALID_TOKEN);
  }
  next();
};

export default authenticate;
