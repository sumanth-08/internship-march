import { DataTypes } from "sequelize";
import getConnection from "../helpers/databaseConnection.js";
import inituserData from "./userModel.js";

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
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    data: Buffer,
    type: DataTypes.STRING,
    allowNull: true,
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

    const user = await inituserData();

    user.hasMany(product, {
      as: "userInfo",
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
      targetKey: "user_id",
    });
    
    // product.belongsTo(user, {
    //   as: "userInfo",
    //   foreignKey: {
    //     allowNull: false,
    //     name: "user_id",
    //   },
    //   targetKey: "user_id",
    // });

    await product.sync({ alter: true });
    return product;
  } catch (err) {
    console.log("modelerror", err.message);
  }
};

export default initProductData;
