import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import gen1Pokemons from '../config/gen-1-pokemons.json';

export const searchedPokemonSlice = createSlice({
	name: 'searchedPokemon',
	initialState: 'bulbasaur',
	reducers: {
		searchPokemon(_, action: PayloadAction<string>) {
			const filteredPokemon = gen1Pokemons.pokemon_species.filter(
				pokemon => pokemon.name === action.payload
			)[0];

			const name = filteredPokemon?.name || '';
			return name;
		}
	}
});

const { actions, reducer } = searchedPokemonSlice;

export const { searchPokemon } = actions;
export { reducer };

export type PokemonState = ReturnType<typeof reducer>;