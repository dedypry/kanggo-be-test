import type { Knex } from 'knex';

const tableName = 'workers';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name');
    table.decimal('price', 18, 2);
    table.jsonb('created_by')
    table.timestamp('created_at').defaultTo(knex.raw('current_timestamp'));
    table.timestamp('updated_at').defaultTo(knex.raw('current_timestamp'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
