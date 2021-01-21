import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '../../../repositories/INotificationsRepository';
import Notification from '../schemas/Notification';
import ICreateNotificationsDTO from '../../../dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationsDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
