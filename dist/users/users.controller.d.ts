import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { PaginationParams } from '../utils/pagination-params';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(userId: number): Promise<UserEntity>;
    updateMe(userId: number, updateUserDto: UserEntity): Promise<{
        statusCode: number;
        message: string;
    }>;
    delete(userId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    findAllUser({ offset, limit, startId, ...options }: PaginationParams): Promise<{
        items: UserEntity[];
        count: number;
    }>;
    getUserById(userId: number): Promise<UserEntity>;
    updateUser(userId: number, updateUserDto: UserEntity): Promise<{
        statusCode: number;
        message: string;
    }>;
    deleteUser(userId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
