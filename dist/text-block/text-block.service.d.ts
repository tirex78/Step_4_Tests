import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TextBlockDto } from './dto/text-block.dto';
import { TextBlockEntity } from './entities/text-block.entity';
import { FilesService } from '../files/files.service';
export declare class TextBlockService {
    private textBlockRepository;
    private filesService;
    constructor(textBlockRepository: Repository<TextBlockEntity>, filesService: FilesService);
    getTextBlock(offset?: number, limit?: number, startId?: number, filtering?: object): Promise<{
        items: TextBlockEntity[];
        count: number;
    }>;
    getTextBlockById(id: number): Promise<TextBlockEntity>;
    create(TextBlock: TextBlockDto): Promise<{
        essence: string;
        id: number;
    }>;
    createTextBlock(TextBlock: TextBlockDto): Promise<{
        essence: string;
        newTextBlock: TextBlockEntity;
    }>;
    updateTextBlock(id: number, updateText: TextBlockDto): Promise<TextBlockEntity>;
    deleteTextBlock(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
