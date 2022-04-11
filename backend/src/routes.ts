import { Router } from "express";
import { studentsController } from "./controllers/students";

const router = Router();

router.post("/students", studentsController.create);
router.get("/students/:id", studentsController.show);
router.patch("/students");
export { router };
