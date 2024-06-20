import { connect } from 'react-redux';
import { searchPokemon, PokemonState } from '../../../stores/searchedPokemon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../../utils';
import loadingSpinner from '../../../assets/bouncing-circles.svg';
import questionMark from '../../../assets/question-mark.svg';
import BackToIndex from '../../../components/BackToIndex';

const actionCreators = {
	searchPokemon
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SearchPokemon({ searchPokemon, searchedPokemon }: any) {
	const [pokemonSprite, setPokemonSprite] = useState('');
	const [loadingPokemonSprite, setLoadingPokemonSprite] = useState(false);

	useEffect(() => {
		if (!searchedPokemon) {
			setPokemonSprite('');
		}

		(async () => {
			setLoadingPokemonSprite(true);
			if (searchedPokemon) {
				const { data } = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`
				);
				setPokemonSprite(data.sprites.front_default);
				setLoadingPokemonSprite(false);
			}
		})();
	}, [searchedPokemon]);

	return (
		<>
			<h2 className="text-xl text-red-700">Search Pokemon</h2>
			<div className="grid">
				<div className="grid justify-center">
					<div>
						{
							<img
								className="w-24 h-24"
								src={
									pokemonSprite
										? pokemonSprite
										: loadingPokemonSprite
										? loadingSpinner
										: questionMark
								}
								alt=""
							/>
						}
					</div>
				</div>
				<h2>
					{searchedPokemon
						? capitalizeFirstLetter(searchedPokemon)
						: 'Not found..'}
				</h2>
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
						className="outline-none text-slate-900 bg-white rounded-lg focus:ring focus:ring-red-500 focus:border-red-500"
					/>
				</div>
			</div>
			<BackToIndex />
		</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: PokemonState) => state;

const ConnectedSearchPokemon = connect(mapState, actionCreators)(SearchPokemon);

export default ConnectedSearchPokemon;
