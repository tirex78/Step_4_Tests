import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LogInDto } from './dto/login.dto';
import { UserResponseInterface } from 'src/users/type/user-responce.interface';
import { Tokens } from './type/tokens.type';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDto): Promise<UserResponseInterface>;
    logIn(data: LogInDto): Promise<UserResponseInterface>;
    buildUserResponse(userId: number, roles: string): Promise<Tokens>;
    logOut(userId: number): Promise<void>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
    hashData(data: string): Promise<string>;
    generateTokens(userId: number, roles: string): Promise<Tokens>;
}
