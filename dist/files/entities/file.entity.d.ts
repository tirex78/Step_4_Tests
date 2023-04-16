import { TextBlockEntity } from '../../text-block/entities/text-block.entity';
export declare class FileEntity {
    id: number;
    filename: string;
    path: string;
    mimetype: string;
    createdAt: Date;
    essenceId: TextBlockEntity;
    essence: string;
}
