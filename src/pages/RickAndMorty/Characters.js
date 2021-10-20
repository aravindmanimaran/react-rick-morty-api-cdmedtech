import React, { useState, useEffect } from "react";
import { CHARACTERS_API } from "../../api/rickandmorty";
import Character from "../../components/Character";
import AddPreferredCharacter from "../../components/AddPreferredCharacter";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import RemovePreferredCharacter from "../../components/RemovePreferredCharacter";

function Characters(props) {
  let [characters, setCharacters] = useState(null);
  const [info, setInfo] = useState({});
  const [preferred, setPreferred] = useState([]);

  const fetchCharacters = (url) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then(({ info, results }) => {
          if (results && Array.isArray(results)) {
            setCharacters(results);
          }
          if (info) {
            setInfo(info);
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCharacters(CHARACTERS_API);
  }, []);

  useEffect(() => {
    const preferredCharacterFromLocalStorage = JSON.parse(
      localStorage.getItem("react-rick-and-morty-preferred-characters")
    );

    setPreferred(preferredCharacterFromLocalStorage);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem(
      "react-rick-and-morty-preferred-characters",
      JSON.stringify(items)
    );
  };

  const addPreferredCharacter = (character) => {
    const newPreferredCharacter = [...preferred, character];
    setPreferred(newPreferredCharacter);
    saveToLocalStorage(newPreferredCharacter);
  };

  const removePreferredCharacter = (character) => {
    const newPreferredCharacter = preferred.filter(
      (characterEach) => characterEach.id !== character.id
    );
    setPreferred(newPreferredCharacter);
    saveToLocalStorage(newPreferredCharacter);
  };

  const onPrevious = () => {
    fetchCharacters(info.prev);
  };

  const onNext = () => {
    fetchCharacters(info.next);
  };

  if (!characters) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="header-and-pagination">
        <h2 className="green-text">Characters</h2>
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
      <hr />
      <div className="row">
        {characters.map((character) => {
          return (
            <div className="col s2" key={character.id}>
              <Character
                key={character.id}
                character={character}
                handlePreferredClick={() => addPreferredCharacter(character)}
                componentToAdd={AddPreferredCharacter}
              />
            </div>
          );
        })}
      </div>

      <h2 className="green-text">Preferred Characters</h2>
      <hr />
      <div className="row">
        {preferred.map((character) => {
          return (
            <div className="col s2" key={character.id}>
              <Character
                key={character.id}
                character={character}
                handlePreferredClick={() => removePreferredCharacter(character)}
                componentToAdd={RemovePreferredCharacter}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Characters;
