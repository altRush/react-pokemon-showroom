import { Provider } from 'react-redux';
import './App.css';
import { ConnectedSearchPokemon } from './features/search-pokemon';
import store from './stores';

function App() {
	return (
		<Provider store={store}>
			<ConnectedSearchPokemon />
		</Provider>
	);
}

export default App;
