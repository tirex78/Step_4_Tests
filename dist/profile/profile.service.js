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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const profile_entity_1 = require("./entities/profile.entity");
const auth_service_1 = require("../auth/auth.service");
const users_service_1 = require("../users/users.service");
let ProfileService = class ProfileService {
    constructor(profileRepository, authenticationService, usersService) {
        this.profileRepository = profileRepository;
        this.authenticationService = authenticationService;
        this.usersService = usersService;
    }
    async signUp(signUpDto) {
        const { user } = await this.authenticationService.register(signUpDto);
        if (user.id && signUpDto.profile) {
            const profileDto = Object.assign({ user_id: user.id }, signUpDto.profile);
            const profile = await this.profileRepository.save(profileDto);
            profile.userId = undefined;
            return {
                user: Object.assign(Object.assign({}, user), { profile })
            };
        }
        return { user };
    }
    async getAllProfiles(offset, limit, startId, options) {
        const where = {};
        let separateCount = 0;
        if (startId) {
            where.id = (0, typeorm_1.MoreThan)(startId);
            separateCount = await this.profileRepository.count();
        }
        const [items, count] = await this.profileRepository.findAndCount(Object.assign({ where, order: {
                id: 'ASC',
            }, skip: offset, take: limit }, options));
        return {
            items,
            count: startId ? separateCount : count,
        };
    }
    async getById(userId) {
        const profile = await this.profileRepository.findOneBy({ user_id: userId });
        profile.user_id = undefined;
        if (profile) {
            return {
                user: Object.assign({}, profile)
            };
        }
        throw new common_1.HttpException('User Profile with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async updateProfile(userId, updateProfileDto) {
        if (updateProfileDto.profile) {
            await this.profileRepository.update({ user_id: userId }, updateProfileDto.profile);
            delete updateProfileDto.profile;
        }
        if (Object.keys(updateProfileDto).length !== 0) {
            await this.usersService.updateUser(userId, updateProfileDto);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'User Profile has been updated'
        };
    }
    async deleteProfile(userId) {
        await this.usersService.deleteUser(userId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'User has removed'
        };
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(profile_entity_1.ProfileEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthenticationService,
        users_service_1.UsersService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map