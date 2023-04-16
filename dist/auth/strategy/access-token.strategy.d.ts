import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../type/token-payload.interface';
declare const AccessTokenStrategy_base: new (...args: any[]) => any;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: TokenPayload): Promise<TokenPayload>;
}
export {};
