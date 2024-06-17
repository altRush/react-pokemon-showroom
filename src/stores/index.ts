import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counter';
import { searchedPokemonSlice } from './searchedPokemon';

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		searchedPokemon: searchedPokemonSlice.reducer
	}
});

export default store;
