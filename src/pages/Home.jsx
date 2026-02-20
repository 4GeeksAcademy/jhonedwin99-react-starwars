import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();


  useEffect(() => {

    fetch("https://swapi.tech/api/people")
      .then(res => res.json())
      .then(async data => {

        const charactersWithDetails = await Promise.all(
          data.results.map(async (character) => {
            const res = await fetch(character.url)
            const details = await res.json()
            return {
              ...character,
              properties: details.result.properties
            }
          })
        )
        dispatch({
          type: "SET_CHARACTERS",
          payload: charactersWithDetails
        });
      });

    fetch("https://swapi.tech/api/planets")
      .then(res => res.json())
      .then(async data => {

        const planetsWithDetails = await Promise.all(
          data.results.map(async (planet) => {
            const res = await fetch(planet.url)
            const details = await res.json()
            return {
              ...planet,
              properties: details.result.properties
            }
          })
        )
        dispatch({
          type: "SET_PLANETS",
          payload: planetsWithDetails
        });
      });
    fetch("https://swapi.tech/api/vehicles")
      .then(res => res.json())
      .then(async data => {

        const vehiclesWithDetails = await Promise.all(
          data.results.map(async (vehicle) => {
            const res = await fetch(vehicle.url)
            const details = await res.json()
            return {
              ...vehicle,
              properties: details.result.properties
            }
          })
        )
        dispatch({
          type: "SET_VEHICLES",
          payload: vehiclesWithDetails
        });
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">Characters</h1>
      <div className="d-flex overflow-auto">
        {store.characters?.map((character, index) => (
          <div key={index} className="card m-2" style={{ minWidth: "18rem" }}>
            <img src="https://placehold.co/400x200"
              className="card-img-top"
              alt={character.name}
            />
            <div className="card-body">
              <h5>{character.name}</h5>
              <ul style={{listStyle: "none", paddingLeft: "0"}}>
                <li>Gender: {character.properties.gender}</li>
                <li>Hair Color: {character.properties.hair_color}</li>
                <li>Eye-Color: {character.properties.eye_color}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link to={`/single/people/${character.uid}`}>
                  <button className="btn btn-primary">
                    Learn more!
                  </button>
                </Link>
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({
                      type: "ADD_FAVORITE",
                      payload: character.name
                    })
                  }}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mt-5">Planets</h1>
      <div className="d-flex overflow-auto">
        {store.planets?.map((planet, index) => (
          <div key={index} className="card m-2" style={{ minWidth: "18rem" }}>
            <img src="https://placehold.co/400x200"
              className="card-img-top"
              alt={planet.name}
            />
            <div className="card-body">
              <h5>{planet.name}</h5>
              <ul style={{listStyle: "none", paddingLeft: "0"}}>
                <li>Population: {planet.properties.population}</li>
                <li>Terrain: {planet.properties.terrain}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link to={`/single/planets/${planet.uid}`}>
                  <button className="btn btn-primary">
                    Learn more!
                  </button>
                </Link>

                <button
                  className="btn btn-warning"
                  onClick={() => dispatch({
                    type: "ADD_FAVORITE",
                    payload: planet.name
                  })}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mt-5">Vehicles</h1>
      <div className="d-flex overflow-auto">
        {store.vehicles?.map((vehicle, index) => (
          <div key={index} className="card m-2" style={{ minWidth: "18rem" }}>
            <img src="https://placehold.co/400x200"
              className="card-img-top"
              alt={vehicle.name}
            />
            <div className="card-body">
              <h5>{vehicle.name}</h5>
              <ul style={{listStyle: "none", paddingLeft: "0"}}>
                <li>name: {vehicle.properties.name}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link to={`/single/vehicles/${vehicle.uid}`}>
                  <button className="btn btn-primary">
                    Learn more!
                  </button>
                </Link>

                <button
                  className="btn btn-warning ms-2"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({
                      type: "ADD_FAVORITE",
                      payload: vehicle.name
                    })
                  }}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
