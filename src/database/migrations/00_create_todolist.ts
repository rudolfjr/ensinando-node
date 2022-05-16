import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("todolist", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.integer("user_id").notNullable();
    table.boolean("status").notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("todolist");
}