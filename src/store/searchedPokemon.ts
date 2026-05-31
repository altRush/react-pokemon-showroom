import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const searchedPokemonSlice = createSlice({
	name: 'searchedPokemon',
	initialState: 'bulbasaur',
	reducers: {
		setSearchedPokemon(_, action: PayloadAction<string>) {
			return action.payload;
		}
	}
});

const { actions, reducer } = searchedPokemonSlice;

export const { setSearchedPokemon } = actions;
export { reducer };

export type SearchedPokemon = ReturnType<typeof reducer>;
