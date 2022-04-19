import { validate } from "class-validator";
import { NextFunction, query, Request, Response } from "express";
import {
  getRepository,
  MoreThanOrEqual,
  Raw,
  SelectQueryBuilder,
} from "typeorm";
import { ValidationExcpetion } from "../errors/validation-expection";
import { Student } from "../models/student";
import moment from "moment";
class Students {
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      let { document, email, name, limit, page, sortBy } = req.query;

      if (!limit) limit = "10";
      if (!page) page = "1";

      const repo = Students.getRepo();
      let query: SelectQueryBuilder<Student> = repo.createQueryBuilder();

      if (document) {
        query = query.andWhere("LOWER(document) LIKE :document", {
          document: `%${document.toString().toLowerCase()}%`,
        });
      }

      if (email) {
        query = query.andWhere("LOWER(email) LIKE :email", {
          email: `%${email.toString().toLowerCase()}%`,
        });
      }

      if (name) {
        query = query.andWhere("LOWER(name) LIKE :name", {
          name: `%${name.toString().toLowerCase()}%`,
        });
      }

      const take: number = parseInt(`${limit}`);
      const currentPage: number = parseInt(`${page}`);
      const skip = take * (currentPage - 1);
      query.take(take);
      query.skip(skip);

      query.orderBy("id", "DESC");

      // todo Sort-by
      const students = await query.getMany();
      const totalStudents = await query.getCount();
      const numberOfPages = Math.ceil(totalStudents / take);

      return res.status(200).json({ students, totalStudents, numberOfPages });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

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
      const { id, email, last_name, name } = req.body;
      const repo = Students.getRepo();
      const student = await repo.findOneOrFail(id);
      Object.assign(student, { email, last_name, name });

      const errors = await validate(student, { stopAtFirstError: false });
      if (errors.length) throw new ValidationExcpetion(errors);

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
      await repo.remove(student);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /*
   * GET Students that were the last week
   */
  public async lastWeekStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const repo = Students.getRepo();

      const sevenDaysAgo = moment(Date.now())
        .subtract(7, "days")
        .format("YYYY-MM-DD");

      const [_, count] = await repo.findAndCount({
        where: {
          created_at: MoreThanOrEqual(sevenDaysAgo),
        },
      });

      return res.status(200).json({ count });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async withSameData(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = Students.getRepo();

      const documents = repo.query(
        "select count (s.id) as count, s.document from students s where s.document in (select st.document from students st  where st.id <> s.id) group by s.document"
      );

      const emails = repo.query(
        "select count (s.id) as count, s.email from students s where s.email in (select st.email from students st  where st.id <> s.id) group by s.email"
      );

      const [cpfFiltered, emailsFiltered] = await Promise.all([
        documents,
        emails,
      ]);

      return res.status(200).json({ cpfFiltered, emailsFiltered });
    } catch (error) {
      console.log(error);
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
