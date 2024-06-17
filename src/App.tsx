import { Provider } from 'react-redux';
import './App.css';
import { ConnectedSearchPokemon } from './features/search-pokemon';
import { ConnectedPokemonShowroom } from './features/pokemon-showroom';
import store from './stores';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';

const router = createBrowserRouter([
	{ path: '/', element: <Layout /> },
	{ path: '/search-pokemon', element: <ConnectedSearchPokemon /> },
	{ path: 'pokemon-showroom', element: <ConnectedPokemonShowroom /> }
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
