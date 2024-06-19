import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import initialShowroomPokemons from '../data/initialShowroomPokemons.json';
import axios, { AxiosResponse } from 'axios';

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

		const resolvedResults: AxiosResponse[] = await Promise.all(results);
		return resolvedResults.map(result => result.data);
	}
);

export const pokemonShowroomStackSlice = createSlice({
	name: 'pokemonShowroomStack',
	initialState,
	reducers: {
		updatePokemonIndex(state, action: PayloadAction<number>) {
			state.currentPokemonIndex = action.payload;
			return state;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchThreePokemonProfiles.fulfilled, (state, action) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const extendedPokemonFullProfile = (action as any).payload;

			const pokemonFullProfile: PokemonFullProfile[] =
				extendedPokemonFullProfile
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.map((pokemonProfile: any) => {
						const pokemonFullProfile: PokemonFullProfile = {
							name: pokemonProfile.name,
							url: `https://pokeapi.co/api/v2/pokemon/${pokemonProfile.id}/`,
							sprite: pokemonProfile.sprites.front_default,
							types: pokemonProfile.types
						};

						return pokemonFullProfile;
					});

			(state.pokemonStack as unknown as PokemonFullProfile[]).push(
				...pokemonFullProfile
			);
		});
	}
});

const { reducer, actions } = pokemonShowroomStackSlice;

export const { updatePokemonIndex } = actions;
export { reducer };
