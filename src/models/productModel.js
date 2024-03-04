import { DataTypes } from "sequelize";
import getConnection from "../helpers/databaseConnection.js";

const productModel = {
  product_id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
};

let product = null;
const initProductData = async () => {
  try {
    if (product) return product;
    const sequelize = await getConnection();
    product = sequelize.define("products", productModel, {
      freezeTableName: true,
    });
    await product.sync({ alter: true });
    return product;
  } catch (err) {
    console.log("modelerror",err.message);
  }
};

export default initProductData;
