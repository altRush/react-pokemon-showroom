import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { SearchPokemon } from '../../../../features/search-pokemon';
import store from '../../../../store';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

describe('<SearchPokemon />', () => {
	beforeEach(() => {
		render(
			<>
				<Provider store={store}>
					<MemoryRouter>
						<SearchPokemon />
					</MemoryRouter>
				</Provider>
			</>
		);
	});

	test('Initial display', () => {
		expect(screen.getByText(`Type a Pokemon's name:`)).toBeDefined();
	});

	test('Type searching for mew should be positive', async () => {
		jest.spyOn(axios, 'get').mockResolvedValue({
			data: {
				sprites: {
					front_default:
						'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'
				}
			}
		});

		await userEvent.type(screen.getByTestId('search-pokemon-input'), 'mew');

		expect(screen.getByText('Mew')).toBeDefined();
		expect(screen.getByTestId('search-pokemon-image')).toHaveAttribute(
			'src',
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'
		);
	});
});
