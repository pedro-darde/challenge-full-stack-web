import { Column, PrimaryGeneratedColumn, Unique } from "typeorm";

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
  email: string;

  @Column()
  ra: string;

  @Column()
  document: string;

  @Column()
  created_at: string;
}
