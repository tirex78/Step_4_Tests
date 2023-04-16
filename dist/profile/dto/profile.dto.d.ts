import { ProfileEntity } from '../entities/profile.entity';
export declare class ProfileDto {
    login: string;
    email: string;
    password: string;
    profile?: ProfileEntity;
}
