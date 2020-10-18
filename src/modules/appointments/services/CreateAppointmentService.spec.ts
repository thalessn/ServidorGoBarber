import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('Should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppoitment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppoitment.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
    });

    it('shoud not be able to create two appointments on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppoitment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppoitment.execute({
            date: appointmentDate,
            provider_id: '123123',
        });

        expect(
            createAppoitment.execute({
                date: appointmentDate,
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
