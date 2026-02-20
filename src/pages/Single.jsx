// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes, { element } from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react"

export const Single = () => {

  const { type, uid } = useParams()
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then(res => res.json())
      .then(data => {
        setDetails(data.result.properties)
      })
  }, [type, uid])
  if (!details) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container">
      <div className="row mt-5">

        <div className="col-md-6">
          <img
            src="https://placehold.co/400x200"
            className="img-fluid"
            alt={details.name}
          />
        </div>

        <div className="col-md-6">
          <h1>{details.name}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sit atque, odio eius quis dicta iusto aliquid ipsum neque est molestias beatae id? Ex voluptas assumenda facere sapiente sunt consequuntur?</p>
        </div>
      </div>

      <hr className="text-danger" />

      <div className="row text-danger text-center">
        {type === "people" && (
          <>
            <div className="col">
              <p>Name</p>
              <p>{details.name}</p>
            </div>
            <div className="col">
              <p>Birth Year</p>
              <p>{details.birth_year}</p>
            </div>
            <div className="col">
              <p>Gender</p>
              <p>{details.gender}</p>
            </div>
            <div className="col">
              <p>Height</p>
              <p>{details.height}</p>
            </div>
            <div className="col">
              <p>Skin Color</p>
              <p>{details.skin_color}</p>
            </div>
            <div className="col">
              <p>Eye Color</p>
              <p>{details.eye_color}</p>
            </div>
          </>
        )}

        {type === "planets" && (
          <>
            <div className="col">
              <p>Name</p>
              <p>{details.name}</p>
            </div>
            <div className="col">
              <p>Climate</p>
              <p>{details.climate}</p>
            </div>
            <div className="col">
              <p>Population</p>
              <p>{details.population}</p>
            </div>
            <div className="col">
              <p>Orbital Period</p>
              <p>{details.orbital_period}</p>
            </div>
            <div className="col">
              <p>Rotation Period</p>
              <p>{details.rotation_period}</p>
            </div>
            <div className="col">
              <p>Diameter</p>
              <p>{details.diameter}</p>
            </div>
          </>
        )}


        {type === "vehicles" && (
          <>
            <div className="col">
              <p>Name</p>
              <p>{details.name}</p>
            </div>
            <div className="col">
              <p>Uid</p>
              <p>{details.uid}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
