"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const argon2 = require("argon2");
const postgres_error_codes_enum_1 = require("../database/postgres-error-codes.enum");
const users_service_1 = require("../users/users.service");
let AuthenticationService = class AuthenticationService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registrationData) {
        const hashedPassword = await this.hashData(registrationData.password);
        try {
            const user = await this.usersService.createUser(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }));
            user.password = undefined;
            user.currentRefreshToken = undefined;
            const tokens = await this.buildUserResponse(user.id, user.roles.join());
            return {
                user: Object.assign(Object.assign({}, user), tokens),
            };
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === postgres_error_codes_enum_1.default.UniqueViolation) {
                throw new common_1.HttpException('User with that email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logIn(data) {
        const user = await this.usersService.getByEmail(data.email);
        if (!user) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches) {
            throw new common_1.HttpException('Password is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        user.password = undefined;
        user.currentRefreshToken = undefined;
        const tokens = await this.buildUserResponse(user.id, user.roles.join());
        return {
            user: Object.assign(Object.assign({}, user), tokens),
        };
    }
    async buildUserResponse(userId, roles) {
        const tokens = await this.generateTokens(userId, roles);
        await this.updateRefreshToken(userId, tokens.refresh_token);
        return tokens;
    }
    async logOut(userId) {
        await this.updateRefreshToken(userId, null);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedToken = await this.hashData(refreshToken);
        await this.usersService.updateUser(userId, { currentRefreshToken: hashedToken });
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.getById(userId);
        if (!user || !user.currentRefreshToken) {
            throw new common_1.HttpException('Access Denied', common_1.HttpStatus.FORBIDDEN);
        }
        const refreshTokenMatches = await argon2.verify(user.currentRefreshToken, refreshToken);
        if (!refreshTokenMatches) {
            throw new common_1.HttpException('Access Denied', common_1.HttpStatus.FORBIDDEN);
        }
        const tokens = await this.generateTokens(user.id, user.roles.join());
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async hashData(data) {
        const result = await argon2.hash(data);
        return result;
    }
    async generateTokens(userId, roles) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                type: roles
            }, {
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
            }),
            this.jwtService.signAsync({
                sub: userId,
                type: roles
            }, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map