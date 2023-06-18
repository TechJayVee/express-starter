import { MigrationInterface, QueryRunner } from "typeorm";

export class initalSchema1687070662330 implements MigrationInterface {
    name = 'initalSchema1687070662330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "user_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying,
                "last_name" character varying,
                "middle_name" character varying,
                "updated_at" date NOT NULL DEFAULT now(),
                "created_at" date NOT NULL DEFAULT now(),
                "deleted_at" date,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
