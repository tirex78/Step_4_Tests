import { FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    getUsers(offset?: number, limit?: number, startId?: number, options?: FindManyOptions<UserEntity>): Promise<{
        items: UserEntity[];
        count: number;
    }>;
    getByEmail(email: string): Promise<UserEntity>;
    getById(userId: number): Promise<UserEntity>;
    createUser(createDto: CreateUserDto): Promise<UserEntity>;
    updateUser(userId: number, updateUserDto: any): Promise<any>;
    deleteUser(userId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
