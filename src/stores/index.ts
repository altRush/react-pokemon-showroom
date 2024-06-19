import { configureStore } from '@reduxjs/toolkit';
import { searchedPokemonSlice } from './searchedPokemon';
import { pokemonShowroomStackSlice } from './pokemonShowroom';

const store = configureStore({
	reducer: {
		searchedPokemon: searchedPokemonSlice.reducer,
		pokemonShowroomStack: pokemonShowroomStackSlice.reducer
	}
});

export default store;
