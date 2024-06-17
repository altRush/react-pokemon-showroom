import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
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

export const { incremented, decremented } = actions;
export { reducer };

export type CounterState = ReturnType<typeof reducer>;
