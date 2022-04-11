import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { ValidationExcpetion } from "../errors/validation-expection";
import { Student } from "../models/student";

class Students {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      let { student } = req.body;
      student = Students.toClass(student);

      const errors = await validate(student, { stopAtFirstError: false });
      if (errors.length) throw new ValidationExcpetion(errors);

      student = await Students.getRepo().save(student);

      return res.status(201).json({
        message: "Usuário inserido com sucesso",
        student_id: student.id,
      });
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const student = await Students.getRepo().findOneOrFail(id);
      return res.status(200).json({ message: "Registro encontrado", student });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, email, birth_date, last_name, name } = req.body;
      const repo = Students.getRepo();
      const student = await repo.findOneOrFail(id);
      Object.assign(student, { email, birth_date, last_name, name });

      await repo.save(student);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const repo = Students.getRepo();

      const student = await repo.findOneOrFail(id);
      await repo.delete(student);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static toClass(student: any) {
    return this.getRepo().create(student);
  }

  static getRepo() {
    return getRepository(Student);
  }
}

export const studentsController = new Students();
