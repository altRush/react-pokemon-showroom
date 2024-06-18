import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counter';
import { searchedPokemonSlice } from './searchedPokemon';
import { pokemonShowroomStackSlice } from './pokemonShowroom';

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		searchedPokemon: searchedPokemonSlice.reducer,
		pokemonShowroomStack: pokemonShowroomStackSlice.reducer
	}
});

export default store;
