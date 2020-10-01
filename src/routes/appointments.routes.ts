import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppoinmentsRepository from '../repositories/AppointmentsRepository';
import CreatAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Habilita o middleware em todas as requisições
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppoinmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreatAppointmentService();

    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
