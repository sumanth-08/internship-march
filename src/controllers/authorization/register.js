import { Router } from "express";
const router = Router();
import RESPONSE from "../../configs/global.js";
import inituserData from "../../models/userModel.js";
import { send, setErrResMsg } from "../../helpers/responseHelper.js";
import constants from "../../configs/constants.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userModel = await inituserData();

    if (!username || username == "") {
      const updatedResponse = setErrResMsg(
        RESPONSE.REQUIRED_PARAMS,
        "username"
      );
      return send(res, updatedResponse);
    }

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

    const isExistingEmail = await userModel.findOne({
      where: {
        email: email,
        isactive: constants.STATE.ACTIVE,
      },
    });

    if (isExistingEmail) {
      const updatedResponse = setErrResMsg(RESPONSE.EXISTING_DATA, "email");
      return send(res, updatedResponse);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email: email,
      username: username,
      password: encryptedPassword,
    });

    return send(res, RESPONSE.SUCCESS);

  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;

// import { Router } from "express";
// import RESPONSE from "../../configs/global.js";
// import { send, setErrResMsg } from "../../helpers/responseHelper.js";
// import inituserData from "../../models/userModel.js";
// import constants from "../../configs/constants.js";
// import bcrypt from "bcrypt";
// const router = Router();

// router.post("/", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const userModel = await inituserData();

//     if (!username || username == "") {
//       const updatedResponse = setErrResMsg(
//         RESPONSE.REQUIRED_PARAMS,
//         "username"
//       );
//       return send(res, updatedResponse);
//     }

//     if (!email || email == "") {
//       const updatedResponse = setErrResMsg(RESPONSE.REQUIRED_PARAMS, "email");
//       return send(res, updatedResponse);
//     }
//     if (!password || password == "") {
//       const updatedResponse = setErrResMsg(
//         RESPONSE.REQUIRED_PARAMS,
//         "password"
//       );
//       return send(res, updatedResponse);
//     }

//     const existingEmail = await userModel.findOne({
//       where: {
//         isactive: constants.STATE.ACTIVE,
//         email: email,
//       },
//     });

//     if (existingEmail) {
//       const updatedResponse = setErrResMsg(RESPONSE.EXISTING_DATA, "email");
//       return send(res, updatedResponse);
//     }

//     let encryptedPassword = await bcrypt.hash(password, 10);

//     await userModel.create({
//       username: username,
//       email: email,
//       password: encryptedPassword,
//     });

//     return send(res, RESPONSE.SUCCESS);
//   } catch (err) {
//     console.log(err);
//     return send(res, RESPONSE.UNKNOWN_ERROR);
//   }
// });
// export default router;
