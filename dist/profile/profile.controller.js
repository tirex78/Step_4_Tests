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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const role_guard_1 = require("../users/guard/role.guard");
const role_enum_1 = require("../users/role.enum");
const get_current_user_decorator_1 = require("../auth/decorators/get-current-user.decorator");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const pagination_params_1 = require("../utils/pagination-params");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async signUp(signUpDto) {
        return await this.profileService.signUp(signUpDto);
    }
    async getMyProfile(userId) {
        const profile = await this.profileService.getById(userId);
        return profile;
    }
    async updateMe(userId, updateUserDto) {
        return this.profileService.updateProfile(userId, updateUserDto);
    }
    async deleteMe(userId) {
        return this.profileService.deleteProfile(userId);
    }
    async getAllProfiles(_a) {
        var { offset, limit, startId } = _a, options = __rest(_a, ["offset", "limit", "startId"]);
        const res = await this.profileService.getAllProfiles(offset, limit, startId, options);
        return res;
    }
    async getProfileById(userId) {
        return this.profileService.getById(userId);
    }
    async updateProfile(userId, updateProfileDto) {
        const res = await this.profileService.updateProfile(userId, updateProfileDto);
        return res;
    }
    async deleteProfile(userId) {
        const res = await this.profileService.deleteProfile(userId);
        return res;
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('auth/signUp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.User)),
    (0, common_1.Get)('profile/me'),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.User)),
    (0, common_1.Patch)('profile/me'),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMe", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.User)),
    (0, common_1.Delete)('profile/me'),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteMe", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAllProfiles", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Get)('profile/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfileById", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Patch)('profile/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Delete)('profile/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteProfile", null);
ProfileController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map