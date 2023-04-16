import { AuthenticationService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LogInDto } from './dto/login.dto';
import { UserResponseInterface } from 'src/users/type/user-responce.interface';
import { Tokens } from './type/tokens.type';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(registrationData: RegisterDto): Promise<UserResponseInterface>;
    login(data: LogInDto): Promise<UserResponseInterface>;
    logout(userId: number): Promise<void>;
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
}
