import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import initialShowroomPokemons from '../config/initialShowroomPokemons.json';
import axios from 'axios';

export type PokemonProfile = {
	name: string;
	url: string;
};

export type PokemonFullProfile = {
	name: string;
	url: string;
	sprite: string;
	types: {
		slot: number;
		type: {
			name: string;
			url: string;
		};
	};
};

export interface PokemonStackState {
	currentPokemonIndex: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pokemonStack: Partial<PokemonFullProfile>[];
}

const initialState = {
	currentPokemonIndex: 3,
	pokemonStack: initialShowroomPokemons
};

export const fetchThreePokemonProfiles = createAsyncThunk(
	'pokemonShowroom/fetchThreePokemonProfiles',
	async (threePokemons: Partial<PokemonFullProfile>[]) => {
		const urlsToFetch = threePokemons.map(pokemon => pokemon.url);

		const results = urlsToFetch.map(url => {
			return axios.get(url || '');
		});

		return await Promise.all(results);
	}
);

export const pokemonShowroomStackSlice = createSlice({
	name: 'pokemonShowroomStack',
	initialState,
	reducers: {
		updatePokemonIndex(state, action: PayloadAction<number>) {
			state.currentPokemonIndex = action.payload + 3;
			return state;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchThreePokemonProfiles.fulfilled, (state, action) => {
			console.log({ state, action });
			// (state.pokemonStack as unknown as PokemonFullProfile[]).push(action.payload);
		});
	}
});

const { reducer, actions } = pokemonShowroomStackSlice;

export const { updatePokemonIndex } = actions;
export { reducer };
