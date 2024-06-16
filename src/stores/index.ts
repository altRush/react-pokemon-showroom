import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {
		incremented: state => {
			return state + 1;
		},
		decremented: state => {
			return state - 1;
		}
	}
});

const { actions, reducer } = counterSlice;

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer
	}
});

export const { incremented, decremented } = actions;
export { reducer };

export default store;
