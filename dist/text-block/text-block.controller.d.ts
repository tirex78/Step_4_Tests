/// <reference types="multer" />
import { TextBlockDto } from './dto/text-block.dto';
import { TextBlockService } from './text-block.service';
import { PaginationParams } from '../utils/pagination-params';
import { FilesService } from '../files/files.service';
import { TextBlockEntity } from './entities/text-block.entity';
export declare class TextBlockController {
    private readonly textBlockService;
    private readonly localFileService;
    constructor(textBlockService: TextBlockService, localFileService: FilesService);
    findAllTextBlock({ offset, limit, startId, ...options }: PaginationParams): Promise<{
        items: TextBlockEntity[];
        count: number;
    }>;
    getTextBlockById(id: number): Promise<TextBlockEntity>;
    create(textBlock: TextBlockDto): Promise<{
        id: number;
    }>;
    createTextBlock(textBlock: TextBlockDto, files: Express.Multer.File[]): Promise<TextBlockEntity>;
    updateTextBlock(id: number, textBlock: TextBlockDto): Promise<TextBlockEntity>;
    deleteTextBlock(id: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
