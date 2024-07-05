import {
	fetchThreePokemonProfiles,
	updatePokemonIndex
} from '../../store/pokemonShowroom';
import axios from 'axios';
import store from '../../store';
import {
	threePokemonProfilesWithValidUrls,
	threePokemonUrls,
	fetchedThreeFullPokemonProfiles,
	afterThunkFetchedSixPokemonProfile,
	threePokemonProfilesWithNoUrls
} from '../data/pokemonShowroom';

afterEach(() => {
	jest.resetAllMocks();
});

describe('pokemonShowroom reducer', () => {
	test('fetch three pokemon profiles with valid urls', async () => {
		const axiosSpy = jest
			.spyOn(axios, 'get')
			.mockResolvedValueOnce(fetchedThreeFullPokemonProfiles[0])
			.mockResolvedValueOnce(fetchedThreeFullPokemonProfiles[1])
			.mockResolvedValueOnce(fetchedThreeFullPokemonProfiles[2]);

		await store.dispatch(
			fetchThreePokemonProfiles(threePokemonProfilesWithValidUrls)
		);

		const state = store.getState();

		expect(axiosSpy).toHaveBeenNthCalledWith(1, threePokemonUrls[0]);
		expect(axiosSpy).toHaveBeenNthCalledWith(2, threePokemonUrls[1]);
		expect(axiosSpy).toHaveBeenNthCalledWith(3, threePokemonUrls[2]);

		expect(state.pokemonShowroomStack.pokemonStack).toEqual(
			afterThunkFetchedSixPokemonProfile
		);
	});

	test('fetch three pokemon profiles with no urls', async () => {
		const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(['']);

		await store.dispatch(
			fetchThreePokemonProfiles(threePokemonProfilesWithNoUrls)
		);

		expect(axiosSpy).toHaveBeenNthCalledWith(1, '');
		expect(axiosSpy).toHaveBeenNthCalledWith(2, '');
		expect(axiosSpy).toHaveBeenNthCalledWith(3, '');
	});

	test('Update pokemon index +3', () => {
		store.dispatch(updatePokemonIndex(6));

		const currentPokemonIndex =
			store.getState().pokemonShowroomStack.currentPokemonIndex;

		expect(currentPokemonIndex).toBe(6);
	});
});
