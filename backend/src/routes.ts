import { Router } from "express";
import { studentsController } from "./controllers/students";

const router = Router();

router.post("/students", studentsController.create);
router.get("/students", studentsController.list);
router.get("/students/:id", studentsController.show);
router.patch("/students", studentsController.update);
router.delete("/students/:id", studentsController.delete);
router.get("/last-students", studentsController.lastWeekStudents);
router.get("/same-info-students", studentsController.withSameData);
export { router };
