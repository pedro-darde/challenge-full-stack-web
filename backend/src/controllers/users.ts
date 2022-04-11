import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getCustomRepository, getRepository, Repository } from "typeorm";
import { ValidationExcpetion } from "../errors/validation-expection";
import { User } from "../models/user";

class Users {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      let { user } = req.body;
      user = Users.toClass(user);

      const errors = await validate(user, { stopAtFirstError: false });
      if (errors.length) throw new ValidationExcpetion(errors);

      user = await Users.getRepo().save(user);

      return res
        .status(201)
        .json({ message: "Usuário inserido com sucesso", user_id: user.id });
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await Users.getRepo().findOneOrFail(id);
      return res.status(200).json({ message: "Registro encontrado", user });
    } catch (error) {
      next(error);
    }
  }

  static toClass(user: any) {
    return this.getRepo().create(user);
  }

  static getRepo() {
    return getRepository(User);
  }
}

export const usersController = new Users();
