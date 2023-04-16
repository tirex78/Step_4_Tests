import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
export declare class FilesService {
    private filesRepository;
    constructor(filesRepository: Repository<FileEntity>);
    saveFiles(files: any, essenceId?: number, essence?: string): Promise<string[]>;
    setEssenceForFiles(data: any): Promise<void>;
    getFileById(fileId: number): Promise<FileEntity>;
    getFilesByEssence(essenceId: number): Promise<FileEntity>;
    deleteFileById(fileId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    removeUnusedAndOldFiles(): Promise<string>;
    setFilesUnused(id: number): Promise<void>;
}
