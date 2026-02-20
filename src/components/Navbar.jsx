import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const [showFavorites, setShowFavorites] = useState(true);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{/* LOGO STAR WARS */}
				<Link to="/">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
						alt="Star Wars"
						style={{ width: "100px" }}
					/>
				</Link>
				{/* FAVORITES DROPDOWN */}
				<div className="position-relative">
					<button
						className="btn btn-primary"
						onClick={() => setShowFavorites(!showFavorites)}
					>
						Favorites {store.favorites.length}
					</button>

					{showFavorites && (
						<ul
							className="dropdown-menu show"
							style={{ position: "absolute", right: 0 }}
						>
							{store.favorites.length === 0 && (
								<li className="dropdown-item text-muted">
									No favorites
								</li>
							)}

							{store.favorites.map((fav, index) => (
								<li
									key={index}
									className="dropdown-item d-flex justify-content-between align-items-center"
								>
									{fav}
									<span
										style={{ cursor: "pointer" }}
										onClick={() =>
											dispatch({
												type: "REMOVE_FAVORITE",
												payload: fav
											})
										}
									>
										🗑
									</span>
								</li>
							))}
						</ul>
					)}

				</div>
			</div>
		</nav >
	);
};
