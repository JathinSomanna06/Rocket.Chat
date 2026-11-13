import generator from 'generate-password';

import { generatePassword } from './generatePassword';

jest.mock('./passwordPolicy', () => {
	const { PasswordPolicy } = jest.requireActual('@rocket.chat/password-policies');

	return {
		passwordPolicy: new PasswordPolicy({
			enabled: true,
			forbidRepeatingCharacters: true,
			forbidRepeatingCharactersCount: 3,
			throwError: true,
		}),
	};
});

describe('generatePassword', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('retries when a generated password does not meet the password policy', () => {
		jest.spyOn(generator, 'generate').mockReturnValueOnce('aaaaaaaaaaaa').mockReturnValueOnce('Abcdef123!@#');

		expect(generatePassword()).toBe('Abcdef123!@#');
		expect(generator.generate).toHaveBeenCalledTimes(2);
	});
});
