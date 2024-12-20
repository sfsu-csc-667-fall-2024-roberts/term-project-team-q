import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(255)", notNull: true, unique: true },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password_hash: { type: "varchar(255)", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable("users");
};