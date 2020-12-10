import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();

        showProfile = new ShowProfileService(fakeUserRepository);
    });

    it('Should be able to show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@gmail.com');
    });

    it('should not be able to show the profile from non-existing user', () => {
        expect(
            showProfile.execute({
                user_id: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
