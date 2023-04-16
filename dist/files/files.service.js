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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
let FilesService = class FilesService {
    constructor(filesRepository) {
        this.filesRepository = filesRepository;
    }
    async saveFiles(files, essenceId, essence) {
        const newFiles = [];
        files.forEach((file) => {
            const fileReponse = {
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
                essenceId: essenceId || null,
                essence: essence || null
            };
            newFiles.push(fileReponse);
        });
        await this.filesRepository.insert(newFiles);
        return newFiles;
    }
    async setEssenceForFiles(data) {
        for (const el of data.images.split(',')) {
            await this.filesRepository.update(el, {
                essence: data.essence,
                essenceId: data.id
            });
        }
    }
    async getFileById(fileId) {
        const file = await this.filesRepository.findOneBy({ id: fileId });
        if (!file) {
            throw new common_1.NotFoundException();
        }
        return file;
    }
    async getFilesByEssence(essenceId) {
        const { tableName } = this.filesRepository.metadata;
        const files = await this.filesRepository.query(`SELECT * FROM ${tableName} WHERE essence_id=$1`, [essenceId]);
        if (Object.keys(files).length === 0) {
            throw new common_1.NotFoundException();
        }
        return files;
    }
    async deleteFileById(fileId) {
        const removedFile = await this.filesRepository.findOneBy({ id: fileId });
        const deleteResponse = await this.filesRepository.delete(fileId);
        if (!deleteResponse.affected) {
            throw new common_1.HttpException('File with this id was not found', common_1.HttpStatus.NOT_FOUND);
        }
        const path = (0, path_1.join)(process.cwd(), removedFile.path);
        await (0, promises_1.rm)(path);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'File has been removed'
        };
    }
    async removeUnusedAndOldFiles() {
        const { tableName } = this.filesRepository.metadata;
        const [pathForDeleteFile] = await this.filesRepository.manager.query(`DELETE FROM ${tableName} 
      WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '1 hour' 
      OR essence_id IS NULL
      RETURNING path`);
        for (const file of pathForDeleteFile) {
            const path = (0, path_1.join)(process.cwd(), file.path);
            await (0, promises_1.rm)(path);
        }
        return `Files has been deleted`;
    }
    async setFilesUnused(id) {
        const { tableName } = this.filesRepository.metadata;
        const filesEssence = await this.filesRepository.manager.query(`SELECT id, essence_id FROM ${tableName} 
      WHERE essence_id=$1`, [id]);
        for (const file of filesEssence) {
            await this.filesRepository.update(file.id, { essence: null, essenceId: null });
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map