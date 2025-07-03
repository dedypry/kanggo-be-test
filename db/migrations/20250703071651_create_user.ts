import type { Knex } from "knex";
import * as bcrypt from 'bcryptjs';

export async function up(knex: Knex): Promise<void> {
    await knex('users')
      .insert([
        {
          fullname: 'John Doe',
          cellphone: '087876519900',
          email: 'john.doe@gmail.com',
          role: 'customer',
          password:  bcrypt.hashSync("password", 9),
        },
        {
          fullname: 'Admin',
          cellphone: '087876519901',
          email: 'admin@gmail.com',
          role: 'admin',
          password:  bcrypt.hashSync("password", 9),
        },
      ])
      .onConflict('email')
      .merge();  
}


export async function down(knex: Knex): Promise<void> {
}

