import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../type/token-payload.interface';
import { UsersService } from '../../users/users.service';
declare const RefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(request: Request, payload: TokenPayload): Promise<{
        refreshToken: string;
        sub: number;
        type: string;
    }>;
}
export {};
