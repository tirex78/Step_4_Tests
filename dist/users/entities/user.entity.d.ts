import { Role } from '../role.enum';
export declare class UserEntity {
    id: number;
    login: string;
    email: string;
    password: string;
    roles: Role[];
    currentRefreshToken: string;
}
