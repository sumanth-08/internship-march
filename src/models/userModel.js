import { DataTypes } from "sequelize";
import getConnection from "../helpers/databaseConnection.js";

const userModel = {
  user_id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isactive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
};

let user = null;
const inituserData = async () => {
  try {
    if (user) return user;
    const sequelize = await getConnection();
    user = sequelize.define("users", userModel, {
      freezeTableName: true,
    });

    await user.sync({ alter: true });
    return user;
  } catch (err) {
    console.log("user-modelerror", err.message);
  }
};

export default inituserData;
















// const user = await inituserData();

// product.belongsTo(user, {
//   as: "userInfo",
//   onDelete: "cascade",
//   foreignKey: {
//     allowNull: true,
//     name: "user_id",
//   },
//   targetKey: "user_id",
// });
