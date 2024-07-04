import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PokemonShowroom from '../../../features/pokemon-showroom/components/PokemonShowroom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import * as initialShowroomPokemons from '../../../data/initialShowroomPokemons.json';

const mockStore = configureStore([]);

console.log({ initialShowroomPokemons });

const store = mockStore({
	pokemonShowroomStack: {
		pokemonStack: initialShowroomPokemons
	}
});

test('Initial display', async () => {
	render(
		<>
			<Provider store={store}>
				<MemoryRouter>
					<PokemonShowroom />
				</MemoryRouter>
			</Provider>
		</>
	);

	// await userEvent.click(screen.getByText('Load Greeting'));
	// await screen.findByRole('heading');

	expect(screen.getByText('Venusaur')).toHaveTextContent('Venusaur');
	expect(screen.getByRole('button')).toHaveTextContent('Load more pokemons..');
});
