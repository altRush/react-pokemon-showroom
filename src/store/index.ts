import { configureStore } from '@reduxjs/toolkit';
import { searchedPokemonSlice } from './searchedPokemon';
import { pokemonShowroomStackSlice } from './pokemonShowroom';

const store = configureStore({
	reducer: {
		searchedPokemon: searchedPokemonSlice.reducer,
		pokemonShowroomStack: pokemonShowroomStackSlice.reducer
	}
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export default store;
