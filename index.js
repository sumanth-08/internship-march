import express from "express";
const app = express();
import dotenv from "dotenv";
import getConnection from "./src/helpers/databaseConnection.js";
import router from "./routes.js";
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router(app);
getConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
