import { Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsEmail, isEmail } from "class-validator";
import { UniqueValidator } from "../validators/unique-constraint";
import { CpfValidator } from "../validators/cpf-validator";
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  birth_date: Date;

  @Column()
  @IsEmail({}, { message: "O email informado não é válido" })
  email: string;

  @Column()
  @UniqueValidator(User, {
    message: "Já existe um aluno com o Registro Acadêmico (RA) informado!",
  })
  ra: string;

  @Column()
  document: string;

  @Column()
  @CpfValidator(User)
  created_at: string;
}
