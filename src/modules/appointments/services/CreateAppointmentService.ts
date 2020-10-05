import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({
        provider_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appoinmentDate = startOfHour(date);

        const findAppoinmentInSameDate = this.appointmentsRepository.findByDate(
            date,
        );

        if (findAppoinmentInSameDate) {
            throw new AppError('This appoinment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider_id,
            date: appoinmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
