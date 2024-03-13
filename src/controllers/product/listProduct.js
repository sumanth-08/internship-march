import { Router } from "express";
import initProductData from "../../models/productModel.js";
import constants from "../../configs/constants.js";
import { send } from "../../helpers/responseHelper.js";
import RESPONSE from "../../configs/global.js";
import inituserData from "../../models/userModel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) ? Number(req.query.limit) : 10;
    let offset = (page - 1) * limit;

    const productModel = await initProductData();
    const userModel = await inituserData();
    // let data = await productModel.findAll({
    //   where: { isactive: constants.STATE.ACTIVE },
    //   order: [["createdAt", "DESC"]],
    //   attributes: ["product_id", "product_name", "price", "image"],
    //   offset: offset,
    //   limit: limit,
    // });

    let data = await userModel.findOne({
      include: [
        {
          model: productModel,
          as: "userInfo",
          where: { isactive: constants.STATE.ACTIVE },
          attributes: ["product_id", "product_name", "price", "image"],
        },
      ],

      where: { isactive: constants.STATE.ACTIVE },
      order: [["createdAt", "DESC"]],

      offset: offset,
      limit: limit,
    });

    // let data = await productModel.findAll({
    //   include: [
    //     {
    //       model: userModel,
    //       as: "userInfo",
    //       where: { isactive: constants.STATE.ACTIVE },
    //       // attributes: ["product_id", "product_name", "price", "image"],
    //     },
    //   ],

    //   where: { isactive: constants.STATE.ACTIVE },
    //   order: [["createdAt", "DESC"]],
    //   attributes: ["product_id", "product_name", "price", "image"],

    //   offset: offset,
    //   limit: limit,
    // });

    // data = data.map((item) => {
    //   return {
    //     product_id: item.product_id,
    //     product_name: item.product_name,
    //     price: item.price,
    //     image: item.image != null ? "/products/" + item.image : null,
    //   };
    // });

    //{comment.image ? "http://localhost:9000"+ comment.image : Logo}
    // console.log(data.length);
    if (data.length == 0) {
      return send(res, RESPONSE.NO_DATA);
    }

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
