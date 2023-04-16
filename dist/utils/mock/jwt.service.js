"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockedJwtService = {
    signAsync: () => {
        return {
            sub: 1,
            type: 'Admin'
        };
    }
};
exports.default = mockedJwtService;
//# sourceMappingURL=jwt.service.js.map