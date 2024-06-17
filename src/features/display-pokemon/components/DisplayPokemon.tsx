import { connect } from 'react-redux';
import { searchPokemon, PokemonState } from '../../../stores/searchedPokemon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../../utils';
import loadingSpinner from '../../../assets/bouncing-circles.svg';
import './DisplayPokemon.css';

const actionCreators = {
	searchPokemon
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DisplayPokemon({ searchPokemon, searchedPokemon }: any) {
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
			<h3>Search Pokemon</h3>
			{pokemonSprite ? (
				<img src={pokemonSprite} alt="" />
			) : (
				<img className="width-half" src={loadingSpinner} alt="" />
			)}
			<h2>{capitalizeFirstLetter(searchedPokemon)}</h2>
			<div className="card">
				<input
					onChange={e => {
						searchPokemon(e.target.value);
					}}
					type="text"
					name="search-pokemon"
					id="search-pokemon"
				/>
			</div>
		</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: PokemonState) => state;

const ConnectedDisplayPokemon = connect(
	mapState,
	actionCreators
)(DisplayPokemon);

export default ConnectedDisplayPokemon;
