import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity as User } from '../entities/user.entity';
import { UsersService } from '../../users/users.service';
import { userStub } from './stubs/users.stub';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>

  const USER_REPOSITORY = getRepositoryToken(User);

  let findOneBy: jest.Mock;
  let create: jest.Mock;
  let save: jest.Mock;
  let update: jest.Mock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findOneBy: findOneBy = jest.fn(),
            create: create = jest.fn(),
            save: save = jest.fn(),
            update: update = jest.fn(),
          }
        }
      ],
    })
      .compile();
    usersService = await moduleRef.get(UsersService);
    usersRepository = await moduleRef.get(USER_REPOSITORY)
    jest.clearAllMocks()
  })

  it('userService should be defined', () => {
    expect(usersService).toBeDefined
  })

  it('userReposytory should be defined', () => {
    expect(usersRepository).toBeDefined
  })

  describe('when getting a user by id', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOneBy.mockReturnValue(Promise.resolve(user));
      })
      it('should return the user', async () => {
        const fetchedUser = await usersService.getById(1);
        expect(fetchedUser).toEqual(user);
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(undefined);
      })
      it('should throw an error', async () => {
        await expect(usersService.getById(1)).rejects.toThrow();
      })
    })
  })

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOneBy.mockReturnValue(Promise.resolve(user));
      })
      it('should return the user', async () => {
        const fetchedUser = await usersService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(undefined);
      })
      it('should throw an error', async () => {
        await expect(usersService.getByEmail('test@test.com')).rejects.toThrow();
      })
    })
  })

  describe('when create user', () => {
    let user: User;
    describe("and the email don't exist", () => {
      beforeEach(() => {
        user = new User();
        create.mockReturnValue(Promise.resolve(user));
      })
      it('should return user', async () => {
        const createUser = await usersService.createUser(userStub());
        expect(createUser).toEqual(user)
      })
    })
  })

  describe('when update user', () => {
    describe('and the user is matched', () => {
      beforeEach(() => {
        let res = {
          statusCode: 200,
          message: 'User has been updated',
          affected: 1
        }
        update.mockReturnValue(Promise.resolve(res));
      })
      it('should return updated user message', async () => {
        const updateUser = await usersService.updateUser(1, userStub());
        delete updateUser.affected
        expect(updateUser).toEqual({
          statusCode: 200,
          message: 'User has been updated'
        });
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        update.mockReturnValue({ affected: 0 });
      })
      it('should throw an error', async () => {
        await expect(usersService.updateUser(1, userStub())).rejects.toThrow();
      })
    })
  })
});