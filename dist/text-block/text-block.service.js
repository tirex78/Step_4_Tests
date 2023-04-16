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
exports.TextBlockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const text_block_entity_1 = require("./entities/text-block.entity");
const files_service_1 = require("../files/files.service");
let TextBlockService = class TextBlockService {
    constructor(textBlockRepository, filesService) {
        this.textBlockRepository = textBlockRepository;
        this.filesService = filesService;
    }
    async getTextBlock(offset, limit, startId, filtering) {
        const where = Object.assign({}, filtering);
        let separateCount = 0;
        if (startId) {
            where.id = (0, typeorm_2.MoreThan)(startId);
            separateCount = await this.textBlockRepository.count();
        }
        const [items, count] = await this.textBlockRepository.findAndCount({
            where,
            relations: {
                images: true,
            },
            select: {
                createdAt: false,
                images: {
                    filename: true,
                    path: true
                }
            },
            order: {
                id: 'ASC',
            },
            skip: offset,
            take: limit,
        });
        return {
            items,
            count: startId ? separateCount : count,
        };
    }
    async getTextBlockById(id) {
        const textBlock = await this.textBlockRepository.findOne({
            where: { id },
            select: {
                images: {
                    filename: true,
                    path: true
                }
            },
            relations: {
                images: true,
            }
        });
        if (!textBlock) {
            throw new common_1.HttpException('TextBlock with this id was not found', common_1.HttpStatus.NOT_FOUND);
        }
        return textBlock;
    }
    async create(TextBlock) {
        const newTextBlock = this.textBlockRepository.create(TextBlock);
        const { tableName } = this.textBlockRepository.metadata;
        await this.textBlockRepository.insert(newTextBlock);
        return {
            essence: tableName,
            id: newTextBlock.id
        };
    }
    async createTextBlock(TextBlock) {
        const newTextBlock = this.textBlockRepository.create(TextBlock);
        const { tableName } = this.textBlockRepository.metadata;
        await this.textBlockRepository.insert(newTextBlock);
        return {
            essence: tableName,
            newTextBlock: newTextBlock
        };
    }
    async updateTextBlock(id, updateText) {
        await this.textBlockRepository.update(id, updateText);
        const updateTextBlock = await this.textBlockRepository.findOne({
            where: { id },
            relations: {
                images: true,
            },
        });
        if (updateTextBlock) {
            return updateTextBlock;
        }
        throw new common_1.HttpException('TextBlock with this id was not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteTextBlock(id) {
        const setUnusedFiles = await this.filesService.setFilesUnused(id);
        const response = await this.textBlockRepository.delete(id);
        if (!response.affected) {
            throw new common_1.HttpException('TextBlock with this id was not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'TextBlock has removed'
        };
    }
};
TextBlockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(text_block_entity_1.TextBlockEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        files_service_1.FilesService])
], TextBlockService);
exports.TextBlockService = TextBlockService;
//# sourceMappingURL=text-block.service.js.map