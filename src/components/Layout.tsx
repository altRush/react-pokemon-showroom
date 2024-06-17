import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/search-pokemon">Search Pokemon</Link>
					</li>
					<li>
						<Link to="/pokemon-showroom">Pokemon Showroom</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
};

export default Layout;
