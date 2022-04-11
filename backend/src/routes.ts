import { Router } from "express";
import { usersController } from "./controllers/users";

const router = Router();

router.post("/users", usersController.create);
router.get("/users/:id", usersController.show);

export { router };
