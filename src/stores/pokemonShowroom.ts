import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import gen1Pokemons from '../config/gen-1-pokemons.json';
import initialShowroomPokemons from '../config/initialShowroomPokemons.json';

export interface PokemonStackState {
	currentPokemonIndex: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pokemonStack: any[];
}

const initialState = {
	currentPokemonIndex: 3,
	pokemonStack: initialShowroomPokemons
} satisfies PokemonStackState as PokemonStackState;

export const pokemonShowroomStackSlice = createSlice({
	name: 'pokemonShowroomStack',
	initialState,
	reducers: {
		loadMoreThreePokemons(state, action: PayloadAction<number>) {
			const newThreePokemonsToDisplay = gen1Pokemons.results.slice(
				action.payload,
				action.payload + 3
			);
			state.pokemonStack.push(...newThreePokemonsToDisplay);
			state.currentPokemonIndex = state.currentPokemonIndex + 3;

			return state;
		}
	}
});

const { actions, reducer } = pokemonShowroomStackSlice;

export const { loadMoreThreePokemons } = actions;
export { reducer };
