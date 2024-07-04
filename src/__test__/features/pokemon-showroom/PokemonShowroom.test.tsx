import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import PokemonShowroom from '../../../features/pokemon-showroom/components/PokemonShowroom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { thunk } from 'redux-thunk';

import * as initialShowroomPokemons from '../../../data/initialShowroomPokemons.json';
import * as gen1Pokemons from '../../../data/gen-1-pokemons.json';
import * as pokemonShowroom from '../../../stores/pokemonShowroom';
import * as utils from '../../../utils';

const next3PokemonsProfiles = [
	{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
	{ name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
	{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }
];

describe('<PokemonShowroom />', () => {
	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const middlewares = [thunk as any];
		const mockStore = configureStore(middlewares);

		const store = mockStore({
			pokemonShowroomStack: {
				pokemonStack: initialShowroomPokemons,
				currentPokemonIndex: 3
			}
		});

		render(
			<>
				<Provider store={store}>
					<MemoryRouter>
						<PokemonShowroom pokemonProfiles={gen1Pokemons} />
					</MemoryRouter>
				</Provider>
			</>
		);
	});

	test('Initial display', async () => {
		expect(screen.getByText('Venusaur')).toBeDefined();
		expect(screen.getByRole('button')).toHaveTextContent(
			'Load more pokemons..'
		);
		expect(screen.getByText('Back to menu').closest('a')).toHaveAttribute(
			'href',
			'/'
		);
	});

	test('Click on Load more pokemons..', async () => {
		jest
			.spyOn(utils, 'getMoreThreePokemonsProfiles')
			.mockReturnValue(next3PokemonsProfiles);

		const updatePokemonIndexSpy = jest.spyOn(
			pokemonShowroom,
			'updatePokemonIndex'
		);

		const fetchThreePokemonProfilesSpy = jest.spyOn(
			pokemonShowroom,
			'fetchThreePokemonProfiles'
		);

		await userEvent.click(screen.getByText('Load more pokemons..'));

		expect(fetchThreePokemonProfilesSpy).toHaveBeenCalledWith(
			next3PokemonsProfiles
		);
		expect(updatePokemonIndexSpy).toHaveBeenCalledWith(6);
	});
});
