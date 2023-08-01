import { User } from '../entities/user.entity';

export function userWithoutPassword(user: User) {
  const { id, login, version, createdAt, updatedAt } = user;
  return { id, login, version, createdAt, updatedAt };
}
