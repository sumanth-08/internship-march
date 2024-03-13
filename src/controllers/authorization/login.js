import { Router } from "express";
const router = Router();
import RESPONSE from "../../configs/global.js";
import inituserData from "../../models/userModel.js";
import { send, setErrResMsg } from "../../helpers/responseHelper.js";
import constants from "../../configs/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userModel = await inituserData();
    if (!email || email == "") {
      const updatedResponse = setErrResMsg(RESPONSE.REQUIRED_PARAMS, "email");
      return send(res, updatedResponse);
    }

    if (!password || password == "") {
      const updatedResponse = setErrResMsg(
        RESPONSE.REQUIRED_PARAMS,
        "password"
      );
      return send(res, updatedResponse);
    }

    const userData = await userModel.findOne({
      where: {
        isactive: constants.STATE.ACTIVE,
        email: email,
      },
    });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      const token = jwt.sign(
        {
          id: userData.user_id,
          username: userData.username,
          email: email,
        },
        process.env.SECURITYKEY
      );

      return send(res, RESPONSE.SUCCESS, token);
    } else {
      return send(res, RESPONSE.CREDENTIAL_ERROR);
    }
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
