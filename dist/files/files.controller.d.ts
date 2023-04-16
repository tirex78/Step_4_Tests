/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { FileEntity } from './entities/file.entity';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    getFileById(id: number, response: Response): Promise<StreamableFile>;
    getFilesByEssence(id: number): Promise<FileEntity>;
    removeFilebyId(fileId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    removeUnusedFiles(): Promise<string>;
    setUnusedFiles(id: number): Promise<void>;
    addFiles(essenceFromBody: {
        essenceId: number;
        essence: string;
    }, files: Express.Multer.File[]): Promise<string[]>;
}
