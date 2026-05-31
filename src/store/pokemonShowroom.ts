import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import initialShowroomPokemons from '../data/initialShowroomPokemons';
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
	}[];
};

export interface PokemonStackState {
	currentPokemonIndex: number;
	pokemonStack: Partial<PokemonFullProfile>[];
	isLoading: boolean;
}

export const fetchThreePokemonProfiles = createAsyncThunk(
	'pokemonShowroom/fetchThreePokemonProfiles',
	async (threePokemons: Partial<PokemonFullProfile>[]) => {
		const urlsToFetch = threePokemons.map(pokemon => pokemon.url ?? '');

		const results = urlsToFetch.map(url => {
			return axios.get(url);
		});

		const resolvedResults: AxiosResponse[] = await Promise.all(results);
		return resolvedResults.map(result => result.data);
	}
);

export const pokemonShowroomStackSlice = createSlice({
	name: 'pokemonShowroomStack',
	initialState: {
		currentPokemonIndex: 3,
		pokemonStack: initialShowroomPokemons,
		isLoading: false
	},
	reducers: {
		updatePokemonIndex(state, action: PayloadAction<number>) {
			state.currentPokemonIndex = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchThreePokemonProfiles.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(fetchThreePokemonProfiles.fulfilled, (state, action) => {
			const extendedPokemonFullProfile = action.payload;

			const pokemonFullProfile: PokemonFullProfile[] =
				extendedPokemonFullProfile.map(pokemonProfile => {
					const pokemonFullProfile: PokemonFullProfile = {
						name: pokemonProfile.name,
						url: `https://pokeapi.co/api/v2/pokemon/${pokemonProfile.id}/`,
						sprite: pokemonProfile.sprites.front_default,
						types: pokemonProfile.types
					};

					return pokemonFullProfile;
				});

			state.pokemonStack.push(...pokemonFullProfile);
			state.isLoading = false;
		});
		builder.addCase(fetchThreePokemonProfiles.rejected, state => {
			state.isLoading = false;
		});
	}
});

const { reducer, actions } = pokemonShowroomStackSlice;

export const { updatePokemonIndex } = actions;
export { reducer };
