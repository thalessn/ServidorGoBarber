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
});
