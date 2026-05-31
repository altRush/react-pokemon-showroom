import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../../utils';
import loadingSpinner from '../../../assets/bouncing-circles.svg';
import questionMark from '../../../assets/question-mark.svg';
import BackToIndex from '../../../components/BackToIndex';
import { AppDispatch, RootState } from '../../../store';
import { setSearchedPokemon } from '../../../store/searchedPokemon';

function displaySprite(
	pokemonSprite: string,
	loadingPokemonSprite: boolean,
	searchedPokemon: string
): string {
	if (loadingPokemonSprite) {
		if (searchedPokemon) {
			return loadingSpinner;
		}
		return questionMark;
	}
	return pokemonSprite;
}

function SearchPokemon() {
	const searchedPokemon = useSelector(
		(state: RootState) => state.searchedPokemon
	);
	const dispatch = useDispatch<AppDispatch>();
	const [pokemonSprite, setPokemonSprite] = useState('');
	const [loadingPokemonSprite, setLoadingPokemonSprite] = useState(false);

	useEffect(() => {
		if (!searchedPokemon) {
			setPokemonSprite('');
			return;
		}

		const abortController = new AbortController();

		(async () => {
			setLoadingPokemonSprite(true);
			try {
				const { data } = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`,
					{ signal: abortController.signal }
				);
				setPokemonSprite(data.sprites.front_default);
				setLoadingPokemonSprite(false);
			} catch {
				setLoadingPokemonSprite(false);
			}
		})();

		return () => abortController.abort();
	}, [searchedPokemon]);

	return (
		<>
			<h2 className="text-xl text-red-700">Search Pokemon</h2>
			<div className="grid">
				<div className="grid justify-center">
					<div>
						<img
							data-testid="search-pokemon-image"
							className="w-24 h-24"
							src={displaySprite(pokemonSprite, loadingPokemonSprite, searchedPokemon)}
							alt=""
						/>
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
						data-testid="search-pokemon-input"
						onChange={e => {
							dispatch(setSearchedPokemon(e.target.value));
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

export default SearchPokemon;
