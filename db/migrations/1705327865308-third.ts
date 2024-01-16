import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1705327865308 implements MigrationInterface {
    name = 'Third1705327865308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."warehouse_type_enum" NOT NULL DEFAULT 'liquid', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'viewer', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uic" character varying NOT NULL, "client_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transfer_type" "public"."transfer_transfer_type_enum" NOT NULL DEFAULT 'buy-in', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "consumer_id" uuid, CONSTRAINT "REL_4215bd41f32fdeb9fcb39ca087" UNIQUE ("consumer_id"), CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "transfer_id" uuid, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "role" "public"."product_role_enum" NOT NULL DEFAULT 'liquid', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfer_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "total_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "transfer_id" uuid, "product_id" uuid, "warehouse_id" uuid, CONSTRAINT "REL_23f2d57f4e8cb45010ee509257" UNIQUE ("transfer_id"), CONSTRAINT "REL_3bc2fcdbabc58c69303cdc8d0d" UNIQUE ("product_id"), CONSTRAINT "REL_55cb0f48808a0508d11f63f96d" UNIQUE ("warehouse_id"), CONSTRAINT "PK_a5d0ac640b05fac227ad4b9a42b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_4215bd41f32fdeb9fcb39ca0875" FOREIGN KEY ("consumer_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_aded79e2a2aa3ab08a45ae9eda5" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfer_details" ADD CONSTRAINT "FK_23f2d57f4e8cb45010ee509257d" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfer_details" ADD CONSTRAINT "FK_3bc2fcdbabc58c69303cdc8d0d2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfer_details" ADD CONSTRAINT "FK_55cb0f48808a0508d11f63f96d5" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfer_details" DROP CONSTRAINT "FK_55cb0f48808a0508d11f63f96d5"`);
        await queryRunner.query(`ALTER TABLE "transfer_details" DROP CONSTRAINT "FK_3bc2fcdbabc58c69303cdc8d0d2"`);
        await queryRunner.query(`ALTER TABLE "transfer_details" DROP CONSTRAINT "FK_23f2d57f4e8cb45010ee509257d"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_aded79e2a2aa3ab08a45ae9eda5"`);
        await queryRunner.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_4215bd41f32fdeb9fcb39ca0875"`);
        await queryRunner.query(`DROP TABLE "transfer_details"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TABLE "transfer"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
    }

}
