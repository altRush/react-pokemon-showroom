import { Provider } from 'react-redux';
import './App.css';
import { ConnectedDisplayPokemon } from './features/display-pokemon';
import store from './stores';

function App() {
	return (
		<Provider store={store}>
			<ConnectedDisplayPokemon />
		</Provider>
	);
}

export default App;
