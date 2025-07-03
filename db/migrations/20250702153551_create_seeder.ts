/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.table('workers').insert([
    { name: 'Tukang Pipa', price: 200000 },
    { name: 'Tukang Cat', price: 250000 },
    { name: 'Tukang Besi', price: 300000 },
  ]);
}

export async function down(knex: Knex): Promise<void> {}
