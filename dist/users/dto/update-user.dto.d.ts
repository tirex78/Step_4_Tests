export declare class UpdateUserDto {
    login?: string;
    email?: string;
    currentRefreshToken?: string;
    profile?: {
        [x: string | number]: string;
    };
}
