import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CHARACTERS_API } from "../../api/rickandmorty";
import Loading from "../../components/Loading";

function CharacterDetails({ match }) {
  let { id } = match.params;
  let [charDetails, setCharDetails] = useState(null);

  useEffect(() => {
    try {
      fetch(`${CHARACTERS_API}/${id}`)
        .then((res) => res.json())
        .then((res) => setCharDetails(res))
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  if (!charDetails) {
    return <Loading />;
  }

  let { image, origin, location, species, gender, status, name, episode } =
    charDetails;

  return (
    <div className="container green-text">
      <br />
      <Link to="/characters" className="green-text">{`< Back`}</Link>
      <h2>{name}</h2>
      <hr />
      <div className="charDetails">
        <div>
          <img alt={name} src={image} />
        </div>
        <div>
          <ul className="collection">
            <li className="collection-item">
              <strong>Origin:</strong> {origin.name}
            </li>
            <li className="collection-item">
              <strong>Location:</strong> {location.name}
            </li>
            <li className="collection-item">
              <strong>Species:</strong> {species}
            </li>
            <li className="collection-item">
              <strong>Gender:</strong> {gender}
            </li>
            <li className="collection-item">
              <strong>Status:</strong> {status}
            </li>
            <li className="collection-item">
              <strong>Episodes:</strong>{" "}
              {episode.map((episodeEach) => (
                <span> {episodeEach.split("/").pop()} </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
