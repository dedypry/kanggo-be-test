import type { Knex } from 'knex';

const tableName = 'orders';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.specificType('workers', 'integer[]');
    table.date('start_date');
    table.date('end_date');
    table.string('status');
    table.integer('total_day');
    table.decimal('total_price', 18, 2);

    table.timestamp('created_at').defaultTo(knex.raw('current_timestamp'));
    table.timestamp('updated_at').defaultTo(knex.raw('current_timestamp'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
