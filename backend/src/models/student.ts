import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UniqueValidator } from "../validators/unique-constraint";
import { CpfValidator } from "../validators/cpf-validator";
@Entity("students")
export class Student {
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
  @IsNotEmpty({ message: "Você deve informar o email." })
  email: string;

  @Column()
  @IsNotEmpty({ message: "Você deve informar o Registro Acadêmico (RA)." })
  @UniqueValidator(Student, {
    message: "Já existe um aluno com o Registro Acadêmico (RA) informado.",
  })
  ra: string;

  @Column()
  @CpfValidator(Student)
  @IsNotEmpty({ message: "Por favor informe um CPF." })
  document: string;

  @Column({ default: "CURRENT_TIMESTAMP" })
  created_at: string;
}
