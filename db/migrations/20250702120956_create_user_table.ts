import type { Knex } from 'knex';

const tableName = 'users';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('fullname');
    table.string('cellphone').unique();
    table.string('email').unique();
    table.string('password');
    table.enu('role', ['customer', 'admin']);

    table.timestamp('created_at').defaultTo(knex.raw('current_timestamp'));
    table.timestamp('updated_at').defaultTo(knex.raw('current_timestamp'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
