import { UserEntity } from "src/users/entities/user.entity";

export const userStub = (): UserEntity => {
  return {
    id: 1,
    login: 'Tester',
    email: 'test@mail.ru',
    password: '123456',
    roles: [],
    currentRefreshToken: ''
  }
}