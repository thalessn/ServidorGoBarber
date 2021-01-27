import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
    disk: container.resolve(DiskStorageProvider),
    s3: container.resolve(DiskStorageProvider),
};

container.registerInstance<IStorageProvider>(
    'StorageProvider',
    providers[uploadConfig.driver],
);
