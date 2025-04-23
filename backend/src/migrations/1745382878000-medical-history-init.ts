import { MigrationInterface, QueryRunner } from "typeorm";

export class MedicalHistoryInit1745382878000 implements MigrationInterface {
    name = 'MedicalHistoryInit1745382878000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medical_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "condition" character varying NOT NULL, "vetClinic" character varying NOT NULL, "notes" character varying, "petId" uuid, CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_8f6640186fa4cd75de1dc424dc4" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_8f6640186fa4cd75de1dc424dc4"`);
        await queryRunner.query(`DROP TABLE "medical_history"`);
    }

}
