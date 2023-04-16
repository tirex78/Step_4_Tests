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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const role_guard_1 = require("./guard/role.guard");
const role_enum_1 = require("./role.enum");
const get_current_user_decorator_1 = require("../auth/decorators/get-current-user.decorator");
const user_entity_1 = require("./entities/user.entity");
const pagination_params_1 = require("../utils/pagination-params");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getMe(userId) {
        return this.usersService.getById(userId);
    }
    async updateMe(userId, updateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }
    async delete(userId) {
        return this.usersService.deleteUser(userId);
    }
    async findAllUser(_a) {
        var { offset, limit, startId } = _a, options = __rest(_a, ["offset", "limit", "startId"]);
        const res = await this.usersService.getUsers(offset, limit, startId, options);
        return res;
    }
    async getUserById(userId) {
        return this.usersService.getById(userId);
    }
    async updateUser(userId, updateUserDto) {
        const res = await this.usersService.updateUser(userId, updateUserDto);
        return res;
    }
    async deleteUser(userId) {
        const res = await this.usersService.deleteUser(userId);
        return res;
    }
};
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.User)),
    (0, common_1.Get)('me'),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.User)),
    (0, common_1.Patch)('me'),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.User)),
    (0, common_1.Delete)('me'),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Patch)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map