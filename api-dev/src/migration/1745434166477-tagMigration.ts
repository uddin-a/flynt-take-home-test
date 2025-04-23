import {MigrationInterface, QueryRunner} from "typeorm";

export class tagMigration1745434166477 implements MigrationInterface {
    name = 'tagMigration1745434166477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "tag" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
    }

}
