import store from '../../store';
import { setSearchedPokemon } from '../../store/searchedPokemon';

beforeEach(() => {
	store.dispatch(setSearchedPokemon('bulbasaur'));
});

describe('searchedPokemon reducer', () => {
	test('search pokemon with correct pokemon name will return appropriate pokemon profile', () => {
		store.dispatch(setSearchedPokemon('mew'));

		const state = store.getState();

		expect(state.searchedPokemon).toEqual('mew');
	});

	test('search pokemon with incorrect will return not pokemon profile', () => {
		store.dispatch(setSearchedPokemon('me2'));

		const state = store.getState();

		expect(state.searchedPokemon).toEqual('me2');
	});

	test('search pokemon with empty string will return not pokemon profile', () => {
		store.dispatch(setSearchedPokemon(''));

		const state = store.getState();

		expect(state.searchedPokemon).toEqual('');
	});
});
