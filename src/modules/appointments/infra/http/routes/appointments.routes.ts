import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreatAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();

// Habilita o middleware em todas as requisições
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentsRepository = new AppointmentsRepository();
    const createAppointmentService = new CreatAppointmentService(
        appointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
