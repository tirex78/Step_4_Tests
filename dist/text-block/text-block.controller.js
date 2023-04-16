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
exports.TextBlockController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const role_guard_1 = require("../users/guard/role.guard");
const role_enum_1 = require("../users/role.enum");
const text_block_dto_1 = require("./dto/text-block.dto");
const text_block_service_1 = require("./text-block.service");
const pagination_params_1 = require("../utils/pagination-params");
const files_service_1 = require("../files/files.service");
const files_interceptor_1 = require("../files/files.interceptor");
let TextBlockController = class TextBlockController {
    constructor(textBlockService, localFileService) {
        this.textBlockService = textBlockService;
        this.localFileService = localFileService;
    }
    async findAllTextBlock(_a) {
        var { offset, limit, startId } = _a, options = __rest(_a, ["offset", "limit", "startId"]);
        return this.textBlockService.getTextBlock(offset, limit, startId, options);
    }
    async getTextBlockById(id) {
        return this.textBlockService.getTextBlockById(id);
    }
    async create(textBlock) {
        const result = await this.textBlockService.create(textBlock);
        const fileDto = {
            id: result.id,
            essence: result.essence,
            images: textBlock.image
        };
        await this.localFileService.setEssenceForFiles(fileDto);
        return { id: result.id };
    }
    async createTextBlock(textBlock, files) {
        const data = await this.textBlockService.createTextBlock(textBlock);
        const { newTextBlock } = data;
        await this.localFileService.saveFiles(files, newTextBlock.id, data.essence);
        return newTextBlock;
    }
    async updateTextBlock(id, textBlock) {
        return this.textBlockService.updateTextBlock(id, textBlock);
    }
    async deleteTextBlock(id) {
        return this.textBlockService.deleteTextBlock(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TextBlockController.prototype, "findAllTextBlock", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextBlockController.prototype, "getTextBlockById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_block_dto_1.TextBlockDto]),
    __metadata("design:returntype", Promise)
], TextBlockController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, files_interceptor_1.LocalFilesInterceptor)({
        fieldName: 'image',
        path: '/textBlock',
        maxFiles: 5,
        fileFilter: (request, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new common_1.BadRequestException('Provide a valid image'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: Math.pow(1024, 2),
        },
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_block_dto_1.TextBlockDto, Array]),
    __metadata("design:returntype", Promise)
], TextBlockController.prototype, "createTextBlock", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, text_block_dto_1.TextBlockDto]),
    __metadata("design:returntype", Promise)
], TextBlockController.prototype, "updateTextBlock", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_enum_1.Role.Admin)),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextBlockController.prototype, "deleteTextBlock", null);
TextBlockController = __decorate([
    (0, common_1.Controller)('textBlock'),
    __metadata("design:paramtypes", [text_block_service_1.TextBlockService,
        files_service_1.FilesService])
], TextBlockController);
exports.TextBlockController = TextBlockController;
//# sourceMappingURL=text-block.controller.js.map