import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpfolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder: tmpfolder,
    uploadsFolder: path.resolve(tmpfolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpfolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;

                return callback(null, filename);
            },
        }),
    },

    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber-2',
        },
    },
} as IUploadConfig;
