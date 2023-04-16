import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "../../users/users.service";
import { UserEntity as User } from '../../users/entities/user.entity';
import * as request from 'supertest';
import { mockedUser } from "./user.mock";
import { AppModule } from "../../app.module";


let app: INestApplication;
let userData: User;

beforeEach(async () => {
  userData = {
    ...mockedUser
  }
  const usersRepository = {
    create: jest.fn().mockResolvedValue(userData),
    save: jest.fn().mockReturnValue(Promise.resolve()),
    signAsync: jest.fn().mockReturnValue(Promise.resolve()),
    findOneBy: jest.fn().mockReturnValue(Promise.resolve())
  }
  const module = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: usersRepository
      }
    ],
  })
    .compile();
  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
})

describe('when registering', () => {

  // test pass when the email is not in the database

  // describe('and using valid data', () => {
  //   it('should respond with the data of the user without the password', () => {
  //     const expectedData = {
  //       ...userData
  //     }
  //     delete expectedData.password;
  //     return request(app.getHttpServer())
  //       .post('/auth/registration')
  //       .send({
  //         login: mockedUser.login,
  //         email: 'test@mail4.ru',
  //         password: '123456'
  //       })
  //       .expect(201)
  //       .expect({
  //         user: {
  //           ...expectedData
  //         }
  //       });
  //   })
  // })
  describe('and user email alredy exist /POST', () => {
    it('should throw an error', () => {
      return request(app.getHttpServer())
        .post('/auth/registration')
        .send({
          login: mockedUser.login,
          email: mockedUser.email,
          password: '123456'
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'User with that email already exists'
        });
    })
  })

  describe('and using invalid data /POST', () => {
    it('should throw an error', () => {
      return request(app.getHttpServer())
        .post('/auth/registration')
        .send({
          email: mockedUser.email
        })
        .expect(400)
    })
  })
})

describe('when user login /POST', () => {
  describe('and using valid data', () => {
    it('should respond status code 200', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@mail.ru',
          password: '123456'
        })
        .expect(200)
    })
  })
})
