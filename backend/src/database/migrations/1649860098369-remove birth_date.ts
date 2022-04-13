import { MigrationInterface, QueryRunner } from "typeorm";

export class removeBirthDate1649860098369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("students", "birth_date");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
