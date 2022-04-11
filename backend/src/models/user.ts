import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UniqueValidator } from "../validators/unique-constraint";
import { CpfValidator } from "../validators/cpf-validator";
@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "Você deve informar o nome do aluno." })
  name: string;

  @Column()
  last_name: string;

  @Column()
  birth_date: Date;

  @Column()
  @IsEmail({}, { message: "O email informado não é válido." })
  email: string;

  @Column()
  @IsNotEmpty({ message: "Você deve informar o Registro Acadêmico (RA)." })
  @UniqueValidator(User, {
    message: "Já existe um aluno com o Registro Acadêmico (RA) informado.",
  })
  ra: string;

  @Column()
  @CpfValidator(User)
  @IsNotEmpty({ message: "Por favor informe um CPF." })
  document: string;

  @Column()
  created_at: string;
}
