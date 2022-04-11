import express from "express";
import { router } from "./routes";
import cors from "cors";
import errorHandler from "./handlers/errors";
const app = express();

app.use(router);
app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.listen(process.env.API_PORT || 3335, () => {
  console.log("api started");
});
