import { Sequelize } from "sequelize";

let connection = null;

const getConnection = async () => {
  if (!connection) {
    connection = new Sequelize({
      database: process.env.DATABASE,
      host: process.env.DBHOST,
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      port: "5432",
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
      },
      logging: false,
    });
    connection
      .authenticate()
      .then(() => console.log("Database Connected Successfully"))
      .catch((err) => console.log("Database Falied to connect", err.message));
  }
  // return connection;
};

export default getConnection;
