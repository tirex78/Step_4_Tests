import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
interface FilesInterceptorOptions {
    fieldName: string;
    path?: string;
    fileFilter?: MulterOptions['fileFilter'];
    limits?: MulterOptions['limits'];
    maxFiles?: number;
}
export declare function LocalFilesInterceptor(options: FilesInterceptorOptions): Type<NestInterceptor>;
export {};
