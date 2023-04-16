import { UserEntity } from '../../users/entities/user.entity';
export declare class ProfileEntity {
    id?: number;
    firstName: string;
    lastName: string;
    phone: string;
    userId: UserEntity;
    user_id: number;
}
