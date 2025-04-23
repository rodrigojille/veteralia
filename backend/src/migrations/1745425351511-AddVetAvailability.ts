import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVetAvailability1745425351511 implements MigrationInterface {
    name = 'AddVetAvailability1745425351511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vet_availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vetId" uuid NOT NULL, "dayOfWeek" integer, "date" date, "startTime" character varying(5) NOT NULL, "endTime" character varying(5) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5ba322395ca03ead268db01bee0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vet_availability" ADD CONSTRAINT "FK_0ab9403178a33a0d90ac60d625e" FOREIGN KEY ("vetId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vet_availability" DROP CONSTRAINT "FK_0ab9403178a33a0d90ac60d625e"`);
        await queryRunner.query(`DROP TABLE "vet_availability"`);
    }

}
