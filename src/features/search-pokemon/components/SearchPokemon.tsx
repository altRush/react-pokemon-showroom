import { connect } from 'react-redux';
import { searchPokemon, PokemonState } from '../../../stores/searchedPokemon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../../utils';
import loadingSpinner from '../../../assets/bouncing-circles.svg';
import './SearchPokemon.css';

const actionCreators = {
	searchPokemon
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SearchPokemon({ searchPokemon, searchedPokemon }: any) {
	const [pokemonSprite, setPokemonSprite] = useState('');

	useEffect(() => {
		if (!searchedPokemon) {
			setPokemonSprite('');
		}

		(async () => {
			if (searchedPokemon) {
				const { data } = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`
				);
				setPokemonSprite(data.sprites.front_default);
			}
		})();
	}, [searchedPokemon]);

	return (
		<>
			<h2 className="text-xl text-red-700">Search Pokemon</h2>
			<div className="grid">
				<div className="grid justify-center">
					{pokemonSprite ? (
						<img className="justify-center" src={pokemonSprite} alt="" />
					) : (
						<img className="width-half" src={loadingSpinner} alt="" />
					)}
				</div>
				<h2>{capitalizeFirstLetter(searchedPokemon)}</h2>
				<div className="card">
					<label className="block" htmlFor="search-pokemon">
						Type a Pokemon's name:
					</label>
					<input
						onChange={e => {
							searchPokemon(e.target.value);
						}}
						type="text"
						name="search-pokemon"
						id="search-pokemon"
						className="outline-none bg-white rounded-lg focus:ring focus:ring-red-500 focus:border-red-500"
					/>
				</div>
			</div>
		</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: PokemonState) => state;

const ConnectedSearchPokemon = connect(mapState, actionCreators)(SearchPokemon);

export default ConnectedSearchPokemon;
