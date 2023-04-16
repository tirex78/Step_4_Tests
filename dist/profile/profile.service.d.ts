import { Repository, FindManyOptions } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { AuthenticationService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ProfileResponseInterface } from './type/profile-responce.interface';
export declare class ProfileService {
    private profileRepository;
    private authenticationService;
    private usersService;
    constructor(profileRepository: Repository<ProfileEntity>, authenticationService: AuthenticationService, usersService: UsersService);
    signUp(signUpDto: ProfileDto): Promise<ProfileResponseInterface>;
    getAllProfiles(offset?: number, limit?: number, startId?: number, options?: FindManyOptions<ProfileEntity>): Promise<{
        items: ProfileEntity[];
        count: number;
    }>;
    getById(userId: number): Promise<{
        user: ProfileEntity & {
            userId: UserEntity;
        };
    }>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    deleteProfile(userId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
