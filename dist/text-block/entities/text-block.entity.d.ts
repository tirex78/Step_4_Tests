import { FileEntity } from '../../files/entities/file.entity';
export declare class TextBlockEntity {
    id?: number;
    title: string;
    name: string;
    description: string;
    group: string;
    createdAt: Date;
    updatedAt: Date;
    images?: FileEntity[];
}
