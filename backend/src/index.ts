import express from "express";
import { router } from "./routes";
import cors from "cors";
import errorHandler from "./handlers/errors";
import "./database/connection";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandler);

app.listen(process.env.API_PORT || 3335, () => {
  console.log("api started");
});
