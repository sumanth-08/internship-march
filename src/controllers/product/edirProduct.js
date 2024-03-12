import { Router } from "express";
import initProductData from "../../models/productModel.js";
import RESPONSE from "../../configs/global.js";
import { send, setErrResMsg } from "../../helpers/responseHelper.js";
import constants from "../../configs/constants.js";

const router = Router();

router.put("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    let data = {};

    // data={
    //     product_name:product_name
    // }

    const { product_name, price } = req.body;

    if (product_name) {
      data.product_name = product_name;
    }

    if (price) {
      data.price = price;
    }

    const productModel = await initProductData();

    const isvalid = await productModel.findOne({
      where: { isactive: constants.STATE.ACTIVE, product_id: product_id },
    });

    if (isvalid) {
      await isvalid.update(data, {
        where: {
          product_id: product_id,
        },
      });
      return send(res, RESPONSE.SUCCESS);
    } else {
      return send(res, RESPONSE.INVALID_ID);
    }
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
