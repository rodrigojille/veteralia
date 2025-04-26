import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordResetAndVerificationFieldsToUser1714097800000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "emailVerificationToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailVerificationToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailVerified"`);
    }
}
