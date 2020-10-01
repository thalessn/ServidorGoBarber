import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentRepository,
        );

        const appoinmentDate = startOfHour(date);

        const findAppoinmentInSameDate = await appointmentsRepository.findByDate(
            date,
        );

        if (findAppoinmentInSameDate) {
            throw new AppError('This appoinment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appoinmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
