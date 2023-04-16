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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const files_service_1 = require("./files.service");
const files_interceptor_1 = require("./files.interceptor");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async getFileById(id, response) {
        const file = await this.filesService.getFileById(id);
        const stream = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), file.path));
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype,
        });
        return new common_1.StreamableFile(stream);
    }
    async getFilesByEssence(id) {
        const files = await this.filesService.getFilesByEssence(id);
        return files;
    }
    async removeFilebyId(fileId) {
        const files = await this.filesService.deleteFileById(fileId);
        return files;
    }
    async removeUnusedFiles() {
        const files = await this.filesService.removeUnusedAndOldFiles();
        return files;
    }
    async setUnusedFiles(id) {
        await this.filesService.setFilesUnused(id);
    }
    async addFiles(essenceFromBody, files) {
        const { essenceId = null, essence = null } = essenceFromBody;
        const images = await this.filesService.saveFiles(files, essenceId, essence);
        return images;
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFileById", null);
__decorate([
    (0, common_1.Get)('/essence/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFilesByEssence", null);
__decorate([
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "removeFilebyId", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "removeUnusedFiles", null);
__decorate([
    (0, common_1.Post)('unused/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "setUnusedFiles", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, files_interceptor_1.LocalFilesInterceptor)({
        fieldName: 'image',
        path: '/file',
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "addFiles", null);
FilesController = __decorate([
    (0, common_1.Controller)('files'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map