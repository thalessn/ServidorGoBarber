import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment) // Decoretor utilizado para definir que a classe é uma entidade
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppoinment = await this.findOne({
            where: { date },
        });

        return findAppoinment || null;
    }
}

export default AppointmentsRepository;
