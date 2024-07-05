import store from '../../store';
import { searchPokemon } from '../../store/searchedPokemon';

describe('searchedPokemon reducer', () => {
	test('search pokemon with correct pokemon name will return appropriate pokemon profile', () => {
		store.dispatch(searchPokemon('mew'));

		const state = store.getState();

		expect(state.searchedPokemon).toEqual('mew');
	});

	test('search pokemon with incorrect will return not pokemon profile', () => {
		store.dispatch(searchPokemon('me2'));

		const state = store.getState();

		expect(state.searchedPokemon).toEqual('');
	});

	test('search pokemon with empty string will return not pokemon profile', () => {
		store.dispatch(searchPokemon('me2'));

		const state = store.getState();

		expect(state.searchedPokemon).toEqual('');
	});
});
