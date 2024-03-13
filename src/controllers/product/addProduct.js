import { Router } from "express";
import initProductData from "../../models/productModel.js";
import RESPONSE from "../../configs/global.js";
import { send, setErrResMsg } from "../../helpers/responseHelper.js";
import uploads from "../../middlewares/uploads.js";
const router = Router();
import authenticate from "../../middlewares/authentication.js";

router.post("/", authenticate, uploads.single("image"), async (req, res) => {
  try {
    const { product_name, price } = req.body;
    const product = await initProductData();

    const user_id = req.user.id;

    if (!product_name || product_name == "") {
      const updatedResponse = setErrResMsg(
        RESPONSE.REQUIRED_PARAMS,
        "Product name"
      );
      return send(res, updatedResponse);
    }

    if (!price || price == "") {
      const updatedResponse = setErrResMsg(RESPONSE.REQUIRED_PARAMS, "Price");
      return send(res, updatedResponse);
    }

    await product.create({
      product_name: product_name,
      price: price,
      image: req.file.filename,
      user_id: user_id,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err.stack);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
