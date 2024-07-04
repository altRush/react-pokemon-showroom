import { Provider } from 'react-redux';
import './App.css';
import { SearchPokemon } from './features/search-pokemon';
import { PokemonShowroom } from './features/pokemon-showroom';
import store from './stores';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';

const router = createBrowserRouter([
	{ path: '/', element: <Layout /> },
	{ path: '/search-pokemon', element: <SearchPokemon /> },
	{ path: 'pokemon-showroom', element: <PokemonShowroom /> }
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
