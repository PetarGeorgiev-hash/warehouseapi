import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1704966163521 implements MigrationInterface {
    name = 'Second1704966163521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "deleted_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transfer_details" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transfer_details" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transfer_details" ADD "deleted_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transfer" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse" ALTER COLUMN "deleted_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transfer" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transfer_details" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "transfer_details" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "transfer_details" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "created_at"`);
    }

}
