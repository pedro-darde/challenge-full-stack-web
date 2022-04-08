import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1649381345157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'users',
                columns: []
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
