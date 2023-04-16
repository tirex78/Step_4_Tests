import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseInterface } from './type/profile-responce.interface';
import { PaginationParams } from '../utils/pagination-params';
import { ProfileEntity } from './entities/profile.entity';
import { UserEntity } from '../users/entities/user.entity';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    signUp(signUpDto: any): Promise<ProfileResponseInterface>;
    getMyProfile(userId: number): Promise<{
        user: ProfileEntity & {
            userId: UserEntity;
        };
    }>;
    updateMe(userId: number, updateUserDto: UpdateProfileDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    deleteMe(userId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    getAllProfiles({ offset, limit, startId, ...options }: PaginationParams): Promise<{
        items: ProfileEntity[];
        count: number;
    }>;
    getProfileById(userId: number): Promise<{
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
