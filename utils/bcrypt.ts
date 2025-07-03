import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 9);
}

export function comparePassword(password: string, encrypted: string): boolean {
  return bcrypt.compareSync(password, encrypted);
}
