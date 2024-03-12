import { Router } from "express";
const router = Router();

import initProductData from "../../models/productModel.js";
import constants from "../../configs/constants.js";
import { send, setErrResMsg } from "../../helpers/responseHelper.js";
import RESPONSE from "../../configs/global.js";

router.delete("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const productModel = await initProductData();

    // if (!product_id || product_id == "") {
    //   const updatedResponse = setErrResMsg(
    //     RESPONSE.REQUIRED_PARAMS,
    //     "product_id"
    //   );
    //   return send(res, updatedResponse);
    // }

    const isValidID = await productModel.findOne({
      where: {
        product_id: product_id,
        isactive: constants.STATE.ACTIVE,
      },
    });

    if (isValidID) {
      await isValidID.update({
        isactive: constants.STATE.INACTIVE,
        where: {
          product_id: product_id,
        },
      });


      return send(res, RESPONSE.SUCCESS);
    } else {
      return send(res, RESPONSE.INVALID_ID);
    }
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
