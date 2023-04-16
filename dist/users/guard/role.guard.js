"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
const RoleGuard = (role) => {
    class RoleGuardMixin extends jwt_auth_guard_1.JwtAuthGuard {
        async canActivate(context) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest();
            return request === null || request === void 0 ? void 0 : request.user['type'].split(',').includes(role);
        }
    }
    return (0, common_1.mixin)(RoleGuardMixin);
};
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map