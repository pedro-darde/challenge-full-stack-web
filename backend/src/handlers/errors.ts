import { ErrorRequestHandler } from "express";
import { EntityNotFoundError } from "typeorm";
import { ValidationExcpetion } from "../errors/validation-expection";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationExcpetion) {
    let errors: Array<string> = [];
    error.errors.forEach(({ constraints }) => {
      errors.push(Object.values(constraints)[0]);
    });

    return response
      .status(422)
      .json({ message: "Validation error", errors: errors });
  }

  if (error instanceof EntityNotFoundError) {
    return response.status(422).json({
      message: "Entity not found",
      errors: ["Não foi possível localizar o registro solicitado."],
    });
  }

  return response
    .status(500)
    .json({ message: "Internval server error", errors: [error] });
};

export default errorHandler;
